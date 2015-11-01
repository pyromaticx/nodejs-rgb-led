var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var Gpio = require('onoff').Gpio;
var red = new Gpio(23, 'out'); // pin 16 on block
var blue = new Gpio(24, 'out'); // pin 18 on block
var green = new Gpio(25, 'out'); // pin 22 on block
var portNum = 3000;  // Listen port

//send homepage
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
// When a POST is submitted, take the color parameter passed in from the POST.. 
app.post('/output/:color', function(req, res) {
	
	//set it to variable color
	var color = req.params.color;
	console.log(color);
	
	// write to pins 
	if (color === "blue") {
		blue.writeSync(blue.readSync() ^ 1);
		red.writeSync(0);
		green.writeSync(0);
	}
	if (color === "red") {
		blue.writeSync(0);
		red.writeSync(red.readSync() ^ 1);
		green.writeSync(0);
	}
	if (color === "green") {
		blue.writeSync(0);
		red.writeSync(0);
		green.writeSync(green.readSync() ^ 1);
	}
	if (color === "clear") {
		blue.writeSync(0);
		red.writeSync(0);
		green.writeSync(0);
	}
	// respond OK and end 
	res.writeHead(200);
	res.end('thanks!');
});

app.listen(portNum);

