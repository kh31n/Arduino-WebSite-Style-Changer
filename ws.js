/*
  App Name: WebSocket Server with Node.js
  Author: hirotoshi kawai
*/

var WebSocket = require('ws');
var wss = new WebSocket.Server({
  host : '0.0.0.0',
  port : 8080
});

var connections = [];

wss.on('connection', function(ws) {
  connections.push(ws);
  console.log('接続成功');
  ws.on('message', function(message) {
    console.log('received: %s', message);
    broadcast(JSON.stringify(message));
  });
});

function broadcast(message) {
  connections.forEach(function (con, i) {
    con.send(message);
  });
}

console.log('server starting...');
