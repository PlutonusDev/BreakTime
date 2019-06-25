function delay(ms) {
	let ctr, rej, p = new Promise(function (resolve, reject) {
		ctr = setTimeout(resolve, ms);
		rej = reject;
	});
	p.cancel = function () { clearTimeout(ctr); rej(Error("Cancelled")) };
	return p;
}

function unlockLogin() {
	$('#connected').delay(3000).slideUp();
	delay(3600).then(() => {
		$('#connected').html("Connected!").removeClass('s-connecting').addClass('s-connected').fadeIn();
		$("#UserName").prop('disabled', false);
		$("#UserName").prop('placeholder', 'Enter your Employee Code');
		$("#Password").prop('disabled', false);
		$("#Password").prop('placeholder', 'Enter your Password');
		$("#loginbtn").prop('disabled', false);
		$("#loginbtn").prop('value', 'Login');
	});
}

const socket = (() => {
	let conn = new btsocket({
		protocol: 'http',
		url: '127.0.0.1',
		port: 36400,
		path: '/breaktime'
	}).connect();

	return {
		getSocket: () => {return conn},
		pingSocket: () => {conn.emit('revive')}
	}
});

const app = (() => {
	function connect() {
		const sock = socket().getSocket();

		sock._timeout = setTimeout(function() {
			/*delay(5000).then(()=>{
				socket.pingSocket();
				connect();
			});*/
			require("./js/events/disconnect").run();
			sock.disconnect();
		}, 2000);

		sock.once('connect', () => {
			clearTimeout(sock._timeout);
			require("./js/events/connect").run();
		});
	}

	delay(2000).then(()=>connect());
})();

/*
		$('#connected').delay(3000).slideUp();
		delay(3600).then(() => {
			$('#connected').html("Connected!").removeClass('s-connecting').addClass('s-connected').fadeIn();
			$("#UserName").prop('disabled', false);
			$("#UserName").prop('placeholder', 'Enter your Employee Code');
			$("#Password").prop('disabled', false);
			$("#Password").prop('placeholder', 'Enter your Password');
			$("#loginbtn").prop('disabled', false);
			$("#loginbtn").prop('value', 'Login');
			playSound('success');
			Swal.fire({
				type: 'success',
				title: 'Connected!',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			});
		});
	}).catch(() => {
		$('#connected').delay(3000).slideUp();
		delay(3600).then(() => {
			$('#connected').html("Disconnected").removeClass('s-connecting').addClass('s-disconnected').fadeIn();
			playSound('warning');
			Swal.fire({
				type: 'error',
				title: 'Can\'t connect!',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			});
		});
	});
});
*/
