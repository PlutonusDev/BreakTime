const io = require('socket.io-client');

function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

class btsocket {
	constructor(data) {
		if(!data.protocol) return new Error('Protocol was not specified.');
		if(!data.url) return new Error('URL was not specified.');

		this.id = makeid(7),
		this.protocol = data.protocol
		this.url = data.url
		this.port = data.port || false
		this.path = data.path || false
		this.instance = false
		this.connected = false
	}

	connect() {
		return new Promise((res, rej) => {
			this.instance = io(`${this.protocol}://${this.url}${this.port ? `:${this.port}` : ''}`, {
				path: this.path || ''
			});

			this.instance._connectTimer = setTimeout(function() {
				this.instance = false;
				rej();
			}, 2000);

			this.instance.once('connect', () => {
				this.connected = true;
				clearTimeout(this.instance._connectTimer);
				res();
			});
		});
	}
}

/*$(function() {
	const socket = io('http://127.0.0.1:36400', {
		path:'/breaktime'
	});
	socket.on('connected', () => {

	});
});*/
