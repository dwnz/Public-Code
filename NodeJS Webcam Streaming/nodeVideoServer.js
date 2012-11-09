/**
* Socket.IO server (single process only)
*/
var express = require("express");

// see https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
// https://gist.github.com/1036976 very simple socket.io@0.7 echo server 

var app = express();
var http = require('http');

var server = http.createServer(app);

var io = require('socket.io').listen(server);

server.listen(8080);

/*
io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);
*/

io.set('transports', [ 'websocket'] );

// https://github.com/LearnBoost/socket.io/issues/283 
// lower the number to lessen the debug output
// log level 0 or 1 : info output
// 2: debug output
io.set( 'log level', 0 );

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/videoclient.html');
});

var connections = [];

io.sockets.on('connection', function (socket) {
    console.log('connection established');
    
    connections[connections.length] = socket;
    
    io.sockets.emit('announcement', "connected" );
    
    socket.on('image update', function(data){
        for(var i = 0; i < connections.length; i++){
            //io.sockets.emit('image remote update', data);
            var con = connections[i];
            if(con.id != socket.id){
                con.emit('image remote update', data);
            }
        }
    });
    
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);    
    });
   
});