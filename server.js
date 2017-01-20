// Include our libraries
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var rn = require('random-number');
var gen = rn.generator({
  min: 10000,
  max: 100000,
  integer: true
})
var logger = require('tracer').colorConsole();
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

// Use router to point requests to the 'files' folder
router.use(express.static(path.resolve(__dirname, 'public')));

// Variables to hold the messages and the sockets
var randomNum = 10000;

io.on('connection', function (socket) {
    logger.log('a user connected');
    io.emit('update number', randomNum);
    socket.on('random number', function (msg) {
      randomNum = gen();
      io.emit('update number', randomNum);
    });
    socket.on('disconnect', function () {
        logger.log('user disconnected');
    });
});
// Start our server
server.listen(process.env.PORT || 8081, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    logger.log("Our server is listening at", addr.address + ":" + addr.port);
});
