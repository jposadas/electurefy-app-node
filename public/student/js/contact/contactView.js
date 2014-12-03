define(['hbs!js/contact/contact'], function(viewTemplate) {
    var $ = Framework7.$;
    var socket = io();

    function render(params) {

    	var boltTime = params.model
        $('.contact-page .bolt-list ul').html(viewTemplate({ bolts: params.model }));
        $('.contacts-header').text(params.courseNumber + ' Bolts');

        var isBoltAnswered = false;
        var previousAnsweredBolt;

        $('.response-icon-container .response-icon').click(function() {
        	$('.response-icon-container .response-icon').removeClass('active');
        	$(this).addClass('active');

        	var responseType = $(this).data('type');


        	/* Updating Response at Instructor screen*/
        	updateResponseForInstructor(responseType, previousAnsweredBolt, isBoltAnswered);
        	previousAnsweredBolt = responseType;
        	isBoltAnswered = true;

        });
 
    }

    function updateResponseForInstructor(responseType, previousAnsweredBolt, isBoltAnswered) {
    	// Update on Database too!!!
    	socket.emit('bolt response', { 
    		responseType : responseType, 
    		previousAnsweredBolt: previousAnsweredBolt,
    		alreadyAnswered: isBoltAnswered
    	});

    }
 
    return {
        render: render
    }
});
