var socket = io();
var room = document.getElementById('roomid').value;

socket.on('connect', function() {
	socket.emit('join_room', room);
});

socket.on('receive_message', function(acc, msg) {
	console.log('received message');
	document.getElementById('chat-list').innerHTML += 
		'<li class="list-group-item"><strong><a href="/users/p/' + acc.id + '/">' + acc.name + '</a>:</strong><span> ' + msg + '</span></li>';
});

document.getElementById('chat-form').onsubmit = function() {
	//get necessary variables
	var msgElement = document.getElementById('message');
	var msg = msgElement.value;

	//cancel empty messages
	if (typeof msg === 'undefined' || msg == '') return false;

	//remove text from input
	msgElement.value = '';

	//send message to other clients
	socket.emit('send_message', room, msg);

	//cancel form submit
	return false;
};