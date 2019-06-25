const fs = require("fs");
const path = require("path");

console.plog = ((msg)=>{console.log('[BreakTime/Server]: '+msg)});
console.log();

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {path: '/breaktime'});

http.listen(36400, () => console.plog('Online @ :36400'));

// Auth Funcs
const bcrypt = require('bcrypt');
function hash(data) {
	return bcrypt.hashSync(data, 10);
}
function verifyhash(data, hash) {
	return bcrypt.compareSync(data, hash);
}


// Database
const app_path = path.join(process.env.APPDATA, "Break Time");

const sql = require('sqlite');
try{fs.mkdirSync(app_path)}catch(e){};
sql.open(path.join(app_path,"global.sqlite")).then(() => {
	sql.run('CREATE TABLE IF NOT EXISTS STAFF (EMAIL TEXT, EMPLOYEE_ID TEXT, PASSWORD TEXT, IS_ADMIN TEXT)').then(() => {
		sql.get('SELECT * FROM STAFF WHERE EMPLOYEE_ID="0000"').then(row => {
			if(!row) {
				let pass = hash("password")
				sql.run('INSERT INTO STAFF VALUES (?, ?, ?, ?)', ["", "0000", pass, "true"]);
			}
		});
	});
});


// Serverside

io.on('connection', function (socket) {
	console.plog('Connection from client');

	socket.on('revive', () => {
		console.plog('Client requested revive - sending "connect" event');
		socket.emit('connect');
	});

	socket.on('login', (data) => {
		console.plog('Client requested login');
		if(!data.employee_id) return socket.emit('login-fail', {'reason':'missing:employee-id'});
		if(!data.password) return socket.emit('login-fail', {'reason':'missing:password'});
		sql.get(`SELECT * FROM STAFF WHERE EMPLOYEE_ID="${data.employee_id}"`).then(row => {
			if(row) {
				if(verifyhash(data.password, row.PASSWORD)) {
					return socket.emit('login-success', {'is-admin':row.IS_ADMIN});
				} else return socket.emit('login-fail', {'reason':'invalid:password'});
			} else return socket.emit('login-fail', {'reason':'invalid:employee-id'});
		});
	});
});

app.get('/', ({res}) => {
	res.status(200).redirect('https://github.com/PlutonusDev/BreakTime');
});