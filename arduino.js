/*
  App Name: Arduino App Style Changer with Johnny-Five and Node.js
  Author: hirotoshi kawai
*/

var five = require('johnny-five');
var board = new five.Board({ port: "/dev/ttyACM0" });
var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');

ws.on('open', function open() {
  console.log('接続成功');
  board.on('ready', function() {
    var led = new five.Led(13);
    var button = new five.Button(7);
    button.on("press", function() {
      led.on();
      ws.send('ON');
    });
    button.on("release", function() {
      led.stop();
      led.off();
      ws.send('OFF');
    });
    button.on("hold", function() {
      led.strobe(500);
      ws.send('ON');
    })
  });
});
