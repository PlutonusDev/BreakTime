$(document).ready(function () {
	$(".login-details").delay(3000).slideToggle();

	$("#forgot-un").on('click', () => {
		$(".login-details").slideToggle();
		$(".forgot-un-details").slideToggle();
	});
	$("#forgot-pw").on('click', () => {
		$(".login-details").slideToggle();
		$(".forgot-pw-details").slideToggle();
	});
	$("#forgot-un-return").on('click', () => {
		$(".login-details").slideToggle();
		$(".forgot-un-details").slideToggle();
	});
	$("#forgot-pw-return").on('click', () => {
		$(".login-details").slideToggle();
		$(".forgot-pw-details").slideToggle();
	});

	const remote = require('electron').remote;
	$('.btn-close').on('click', () => {
		Swal.fire({
			type: 'warning',
			text: 'Are you sure you want to exit?',
			showCancelButton: true,
			successButtonText: 'Yes',
			cancelButtonText: 'No'
		}).then(result => {
			playSound('tap');
			if (result.value) {
				setTimeout(() => {
					var window = remote.getCurrentWindow();
					window.close();
				}, 200);
			}
		});
	});
});