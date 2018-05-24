var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require("express-session");
var csrf = require('express-csurf');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');

var app = express();

var csrfProtection = csrf();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.sessionMiddleware = session({
  secret: '*v03fGi%VYH2',
  resave: false,
  saveUninitialized: false
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.sessionMiddleware);
app.use(csrfProtection);

app.use(function(req, res, next) {
  //send csrf token to view
  res.locals.csrfToken = req.csrfToken();

  //send user data to view if logged in
  if (typeof req.session.acc !== 'undefined') {
    res.locals.acc = req.session.acc;
  }

  if (req.session.err) {
    res.locals.err = req.session.err;
    req.session.err = null;
  }

  if (req.session.succ) {
    res.locals.succ = req.session.succ;
    req.session.succ = null;
  }

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

//catch 404 errors
app.use(function(req, res, next) {
  req.session.err = 'The page you were searching for does not exist!';
  res.redirect('/');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
