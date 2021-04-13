var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var SocketLib = require('./libs').SocketLib;
var SocketLibObj = new SocketLib();

/**
 * socket step 1 starts
 */
var http=require("http");
var socketio=require("socket.io");
/**
 * socket step 1 ends
 */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/**
 * socket step 2 starts
 */
// Create the http server
const server = require('http').createServer(app);
app.server = server;
  
// Create the Socket IO server on 
// the top of http server
const socket = socketio(server);
/**
 * socket step 2 ends
 */

/**
 * test socket starts
 */
// socket.on("connect", () => {

//   console.log('inside socket connect');
// } );

socket.on( 'connect', SocketLibObj.connection )
/**
 * test socket ends
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
