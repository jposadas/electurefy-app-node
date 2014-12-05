
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
 	res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
 	res.sendFile(__dirname + '/chat.html');
});

app.get('/instructor', function(req, res) {
	res.sendFile(__dirname + '/instructor.html');
});

app.get('/student', function(req, res) {
	res.sendFile(__dirname + '/student.html');
});

io.on('connection', function(socket){
	
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('bolt sent', function() {
		io.emit('bolt sent');
	});

	socket.on('bolt ended', function(newBoltId) {
		console.log('bolt ended');
		io.emit('bolt ended', newBoltId);
	});

	socket.on('bolt response', function(response) {
		console.log('bolt responded');
		io.emit('bolt responded', response);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
