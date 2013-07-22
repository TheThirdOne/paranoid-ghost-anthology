var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , library = require('./public/lib/library.js')
  , util = require('util')
  , host = require('./statichost.js');
var server = host.makeServer('./public')
  ;//, handler = host.handler;
var port = process.env.PORT || 3000;
app.listen(port);
var players = [];
var sockets = [];
var nameIndex = 0;

function handler (req, res) {
  console.log(req.url);
  host.handler(req,res, server,util);
}

io.sockets.on('connection', function (socket) {
  players[socket.id] = new library.player(socket.id, nameIndex++);
  sockets[socket.id] = socket;
  socket.emit(library.protocals.init, players[socket.id]);
  var address = socket.handshake.address;
  console.log("New connection from " + address.address + ":" + address.port);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('button', function (data) {
    console.log(data);
    socket.emit('return', {text:'yoloswagbutton'});
  });
  socket.on(library.protocals.ping, function (data) {
    socket.emit(library.protocals.ping_awk, data);
  });
  socket.on(library.protocals.update, function (data) {
    players[socket.id] = data;
    console.log(data);
    socket.broadcast.emit(library.protocals.update, data);
    socket.emit(library.protocals.update_awk, data);
  });
});