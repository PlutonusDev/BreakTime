module.exports = {
	run: () => {
		playSound("success");
		Swal.fire({
			type: 'success',
			title: 'Connected!',
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		});

		$('#connected').slideUp();
		delay(500).then(() => {
			$('#connected').html("Connected!").removeClass('s-connecting').addClass('s-connected').fadeIn();
			$("#UserName").prop('disabled', false);
			$("#UserName").prop('placeholder', 'Enter your Employee Code');
			$("#Password").prop('disabled', false);
			$("#Password").prop('placeholder', 'Enter your Password');
			$("#loginbtn").prop('disabled', false);
			$("#loginbtn").prop('value', 'Login');
		},3000);
	}
}