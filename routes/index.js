var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var mysqlModel = require('mysql-model');

/*var MyAppModel = mysqlModel.createConnection({
	host: 'localhost',
	user: 'root',
	pass: '',
	database: 'database_nanme'
});

var User = MyAppModel.extend({
  tableName: 'users',
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {title: 'WebChat2 Home'};
	if (typeof req.session.succ !== 'undefined') {
		data.succ = req.session.succ;
		req.session.succ = null;
	}

	res.render('index', data);
});

module.exports = router;
