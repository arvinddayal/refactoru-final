$(function(){

	
	//Hide/shows appropriate special considerations depending on purpose
	$('#location').change(function(){
		if ($('#location').val()==="home") {
			$('.homeGroup').attr('disabled', false);
			$('.home').show();
			$('#travel').attr('disabled', 'disabled');
			$('.travel').hide();
		}
		else if ($('#location').val()==="vehicle") {
			$('#travel').attr('disabled', false);
			$('.travel').show();
			$('.homeGroup').attr('disabled', 'disabled');
			$('.home').hide();
		}
		else if ($('#location').val()==="location") {
			$('.homeGroup').attr('disabled', false);
			$('.home').show();
			$('#travel').attr('disabled', false);
			$('.travel').show();
		}
	});

	//Validates form, stops submission if necessary
	$('#submit-questionnaire').click(function(e){

		if ($('#name').val()==="") {
			e.preventDefault();
			$('#name').addClass('error');
			console.log("hi");
		}
		if ($('#location').val()==="location") {
			e.preventDefault();
			$('#location').addClass('error');
		}
		if ($('#groupSize').val()==="groupSize") {
			e.preventDefault();
			$('#groupSize').addClass('error');
		}
		if ($('#pets').val()==="pets") {
			e.preventDefault();
			$('#pets').addClass('error');
		}
	});


	




});