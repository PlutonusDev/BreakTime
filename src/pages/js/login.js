const moment = require("moment");
const time = require("moment-duration-format")(moment);

$(document).ready(function () {
	setInterval(() => UpdateDateAndTimeDisplay(), 1000);
	const sock = socket().getSocket();
	
	$("#loginbtn").click(() => {
		sock.emit('login', {
			employee_id: $("#UserName").val(),
			password: $("#Password").val()
		});
	});

	sock.on('login-fail', ({reason}) => {
		playSound('warning');
		Swal.fire({
			type: 'warning',
			title: reason,
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});
	});
	sock.on('login-success', () => {
		playSound('success');
		Swal.fire({
			type: 'success',
			title: "Logged in!",
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});
	});
});

function UpdateDateAndTimeDisplay() {
    $("#lblDateDisplay").html(moment().format("DD/MM/YY"));
    $("#lblTimeDisplay").html(moment().format("hh:mm:ss"));
}