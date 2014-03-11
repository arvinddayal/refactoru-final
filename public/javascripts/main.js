$(function(){

	
	//Hide/shows appropriate special considerations depending on purpose
	$('#purpose').change(function(){
		if ($('#purpose').val()==="home") {
			$('.homeGroup').attr('disabled', false);
			$('.home').show();
			$('#travel').attr('disabled', 'disabled');
			$('.travel').hide();
		}
		else if ($('#purpose').val()==="vehicle") {
			$('#travel').attr('disabled', false);
			$('.travel').show();
			$('.homeGroup').attr('disabled', 'disabled');
			$('.home').hide();
		}
		else if ($('#purpose').val()==="purpose") {
			$('.homeGroup').attr('disabled', false);
			$('.home').show();
			$('#travel').attr('disabled', false);
			$('.travel').show();
		}
	});

	//Serializes and submits questionnaire to /Submit
	$('#submit-questionnaire').click(function(){
		var date = new Date();
		var dayStr= date.toDateString();
		if ($('#name').val()===null || $('#name').val()==="") {
			$('#name').val(moment(dayStr).format("MM/DD/YYYY"));
		}
	});





});