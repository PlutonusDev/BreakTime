module.exports = {
	run: () => {
		playSound("warning");
		Swal.fire({
			type: 'error',
			title: 'Can\'t connect!',
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});

		$('#connected').slideUp();
		delay(500).then(() => {
			$('#connected').html("Disconnected").removeClass('s-connecting').addClass('s-disconnected').fadeIn();
		});
	}
}