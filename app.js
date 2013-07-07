var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , library = require('./lib/library.js');
var port = process.env.PORT || 3000;
app.listen(port);
function handler (req, res) {
  console.log(req.url);
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
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
    socket.emit('ping_awk', data);
  });
});