const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {path: '/breaktime'});

io.on('connection', function (socket) {
	console.log('BreakTime Connected.');
	socket.emit('connected');

	socket.on('disconnect', function () {
		console.log('BreakTime Disconnected.');
	});
});

app.get('/', ({res}) => {
	res.status(200).redirect('https://github.com/PlutonusDev/BreakTime');
});

app.get('/breaktime', ({res}) => {
	res.send('Connected.');
});

http.listen(36400, () => console.log('Backend available at localhost:36400'));