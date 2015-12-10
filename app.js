var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var socket_io = require('socket.io');
var socket_io_client = require('socket.io-client');
var twitch_strategy = require('passport-twitchtv');
var donations = require('./routes/donations');
var index = require('./routes/index');
var bingo = require('./routes/bingo');
var dbconfig = require('./config/dbconfig.js');
var mongoose = require('mongoose');
var props = require('./properties.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Set app.io so it's available for use in bin/www
var io = socket_io();
app.io = io;



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: props.sessionSecret}));
app.use(express.static(path.join(__dirname, 'public')));


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//PASSPORT CONFIG
var passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
var auth = require('./routes/auth')(passport);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//ROUTES CONFIG
app.use('/', index);
app.use('/auth', auth);
app.use('/donations', donations);
app.use('/bingo', bingo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//DATABASE
var connString = dbconfig.url;
connString = connString.replace("$user", props.db.db_user);
connString = connString.replace("$pass", props.db.db_pass);
connString = connString.replace("$db", props.db.db_name);
mongoose.connect(connString);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//DONATIONS SOCKETS
var streamtip_socket = socket_io_client.connect('https://streamtip.com', {
  query: 'client_id=' +
  encodeURIComponent(props.streamtip.streamtip_client_id) +
  '&access_token=' +
  encodeURIComponent(props.streamtip.streamtip_access_token)
});

var donation_socket = io.of('/donations');

streamtip_socket.on('newTip', function(data) {
  console.log('WE GOT A TIP: ' + data.amount);
  donation_socket.emit('newTipEvent', data);
});


donation_socket.on('connection', function(socket){

  socket.join('donations');
  socket.emit('news', { hello: 'world'});
  socket.on('disconnect', function() {
    socket.leave('donations');
  });

});

module.exports = app;
