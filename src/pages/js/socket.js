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
		this.instance = io(`${this.protocol}://${this.url}${this.port ? `:${this.port}` : ''}`, {
			path: this.path || ''
		});
		return this.instance;
	}

	disconnect() {
		this.instance.disconnect();
	}
}