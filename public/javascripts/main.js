$(function(){
	//Modal functions
	$(document).foundation();
	$('#myModal').foundation('reveal', 'close');
	
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
		var date = new Date();
		var dayStr= date.toDateString();
		//Puts full date into hidden timecreated input
		$('#timeCreated').val(date);
		//Puts current date into Name box if empty
		if ($('#name').val()==="") {
			$('#name').val(moment(dayStr).format("MM/DD/YYYY"));
		}
		//Form Validation
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

//Clicking Checkmark updates added date and expiration date
	$(document).on('click', "#check", function(){
		var profileID = $(this).data("profileid");
		var kitID = $(this).data("kitid");
		var itemID = $(this).data('itemid');
		$.ajax('/update/'+itemID,{
			data: {profileID:profileID,kitID:kitID,itemID:itemID},
			success: function(data){
				console.log(data);
			}
		});
	});



});