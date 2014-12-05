define(['app', 'hbs!js/contact/contact'], function(app, viewTemplate) {
    var $ = Framework7.$;
    var socket = io();

    function render(params) {

    	var boltTime = params.model
        $('.contact-page .bolt-list ul').html(viewTemplate({ bolts: params.model, showCurrent: params.showCurrent }));
        $('.contacts-header').text(params.courseNumber + ' Bolts');

        var isBoltAnswered = false;
        var previousAnsweredBolt;

        $('.response-icon-container .response-icon').click(function() {
        	$('.response-icon-container .response-icon').removeClass('active');
            $('.response-icon-container .response-icon').removeClass('danger');
        	

        	var responseType = $(this).data('type');

            if (responseType === 'check') {
                $(this).addClass('active');
            } else if (responseType === 'x') {
                $(this).addClass('danger');
            }

        	/* Updating Response at Instructor screen*/
        	updateResponseForInstructor(responseType, previousAnsweredBolt, isBoltAnswered);
        	previousAnsweredBolt = responseType;
        	isBoltAnswered = true;

        });

        socket.on('bolt ended', function() {
            app.router.load('contact');
            // console.log('bolt ended');
            // var responseType = $('.response-icon-container .response-icon.active').data('type');
            // if (responseType === 'x') {
            //     responseType = false;
            // } else if (responseType === 'check') {
            //     responseType = true;
            // }
            // saveResponsesToDatabase(responseType, newBolt);
        });
 
    }

    function saveResponsesToDatabase(responseType, newBoltInfo) {
        // Create bolt element on Database
        console.log(responseType);
        console.log(newBoltInfo);

        var Bolts = Parse.Object.extend('Bolts');
        var newBolt = new Bolts();

        newBolt.set('BoltNum', newBoltInfo.attributes.BoltNum);
        newBolt.set('lectureObjectId', newBoltInfo.attributes.lectureObjectId);
        newBolt.set('numNeg', newBoltInfo.attributes.numNeg);
        newBolt.set('numPos', newBoltInfo.attributes.numPos);
        newBolt.set('isResponsePositive', responseType);
        newBolt.set('totalResponses', newBoltInfo.attributes.numPos + newBoltInfo.attributes.numNeg);
        newBolt.set('timeOfBolt', newBoltInfo.attributes.timeOfBolt);
        

        newBolt.save(null, {
            success: function(newBolt) {
                console.log('New object created: ' + newBolt.id);
                app.router.load('contact');
                
            }, 
            error: function(newBolt, error) {
                console.log('Error when trying to save new Bolt to database: ' + error);
            }
        })

    }

    var updateResponseForInstructor = function (responseType, previousAnsweredBolt, isBoltAnswered) {
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
