$(function(){

		$('#purpose').change(function(){
			if ($('#purpose').val()==="home") {
				$('.homeGroup').attr('disabled', false);
				$('.home').show();
				$('#travel').attr('disabled', 'disabled');
				$('.travel').hide();
			}
			else if ($('#purpose').val()==="travel") {
				$('#travel').attr('disabled', false);
				$('.travel').show();
				$('.homeGroup').attr('disabled', 'disabled');
				$('.home').hide();
			}
		});




	//Serializes and submits questionnaire to /Submit
	$('#submit-questionnaire').click(function(){

		var x = $('#questionnaire').serialize();
		console.log(x);

	});





});