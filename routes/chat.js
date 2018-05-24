var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var mysqlModel = require('mysql-model');
var utils = require('utils');

router.get('/:id', function(req, res, next) {
	if (typeof req.session.acc === 'undefined') {
		req.session.err = 'You must be logged in to access this page!';
		res.redirect('/');
		return;
	}

	if (!utils.isNumeric(req.params.id)) {
		req.session.err = 'Invalid ID specified!';
		res.redirect('/');
		return;
	}

	var data = {title: 'Chat'};
	utils.getRoomInfo(parseInt(req.params.id), req, function(room) {

		//save room information to data
		data.room = room;

		//get existing messages in room to send to user
		utils.getMessagesFromRoom(room.id, function(messages) {
			//put existing messages in data
			data.room.messages = messages;

			//send data to user w/ view
			res.render('chat', data);
		});

	});
});

module.exports = router;
