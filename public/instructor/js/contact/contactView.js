define(['app', 'hbs!js/contact/contact'], function(app, viewTemplate) {
    
    var $ = Framework7.$;
    var socket = io();

    // Init slider and store its instance in mySlider variable
  var mySlider = app.f7.slider('.slider-container', {
    pagination:'.slider-pagination'
  });
 
    function render(params) {

        var mostRecentBolt = params.model.lectureBolts[params.model.lectureBolts.length - 1];
        console.log(mostRecentBolt);
        mostRecentBolt.attributes.totalResponses = mostRecentBolt.attributes.numPos + mostRecentBolt.attributes.numNeg;


        $('.contact-page').html( viewTemplate( 
        	{ lectureNumber: params.model.lectureNumber,
        	  lectureDate: params.model.lectureDate,
        	  lectureTime: params.model.lectureTime,
              mostRecentBolt: mostRecentBolt,
              descendingBolts: params.model.descendingBolts
        	}
       	));

        var currentLectureTime;

        $('.contacts-header').text("Current Lecture");

        currentLectureTime = setTimer(params.model.lectureStartTime);
        setInterval(function() {
        	currentLectureTime = setTimer(params.model.lectureStartTime);
        }, 1000);


        /*Slider */

        var bolts = params.model.lectureBolts;
        var numBolts = bolts.length;
        var currentBolt = bolts[numBolts - 1].attributes.BoltNum;

        var updateBoltInformation = function(currentBolt) {

         //    console.log(currentBolt);
         //    console.log(bolts);
        	console.log(bolts[currentBolt - 1]);

        	$('#numNeg').text(bolts[currentBolt - 1].attributes.numNeg);
	        $('#numPos').text(bolts[currentBolt - 1].attributes.numPos);
            var totalResponses = bolts[currentBolt - 1].attributes.numNeg + bolts[currentBolt - 1].attributes.numPos;
            var totalResponsesText = (totalResponses === 1) ? 'RESPONSE' : 'RESPONSES';
	        $('#totalBolts').text(totalResponses + ' ' + totalResponsesText);
	        $('#timeOfBolt').text(bolts[currentBolt - 1].attributes.timeOfBolt);

        };

        updateBoltInformation(currentBolt);

        $('#scroll-bolt-left').click(function() {
        	
        	console.log("left");
        	currentBolt = (currentBolt == 1) ? numBolts : --currentBolt;
        	console.log("Curent bolt: " + currentBolt);
        	
        	updateBoltInformation(currentBolt);

        });

        $('#scroll-bolt-right').click(function() {
        	
        	console.log("right");
        	currentBolt = (currentBolt == numBolts) ? 1 : ++currentBolt;
        	console.log("Curent bolt: " + currentBolt);
        	
        	updateBoltInformation(currentBolt);
        });

        /* Sending Bolt */

        var currentBoltLive = false;

        $('#send-bolt').click(function() {
        	if (!currentBoltLive) {

                /* Changing Panel Information */
                $('.panel-title').text('BOLT IN PROGRESS');

                /* Emiting socket */
                socket.emit('bolt sent');

        		currentBoltLive = true;
                $('#send-bolt').parents('.row').hide();
                $('#end-bolt').show();
        		$('#end-bolt').parents('.row').show();

        		var newBolt = {
	        		attributes: {
	        			BoltNum: bolts.length + 1,
	        			lectureObjectId: "Lecture 17",
	        			numNeg: 0,
	        			numPos: 0,
	        			totalResponses: 0,
	        			timeOfBolt: currentLectureTime
	        		}
	        	}

	        	bolts.push(newBolt);
	        	// Push to Database

	        	numBolts = bolts.length;
	        	currentBolt = newBolt.attributes.BoltNum;

                updateBoltInformation(currentBolt);

                /* Receiving Bolt from socket */
                socket.on('bolt responded', function(obj) {

                    console.log('========================================');
                    console.log('bolt-responded');
                    console.log('alreadyAnswered: ' + obj.alreadyAnswered);

                    if (obj.alreadyAnswered) {
                        if (obj.previousAnsweredBolt === 'check') {
                            bolts[currentBolt - 1].attributes.numPos--;
                        } else if (obj.previousAnsweredBolt === 'x') {
                            bolts[currentBolt - 1].attributes.numNeg--;
                        }
                    }

                    console.log(bolts[bolts.length - 1]);

                    if (obj.responseType === 'check') {
                        bolts[bolts.length - 1].attributes.numPos++;
                    } else if (obj.responseType === 'x') {
                        bolts[bolts.length - 1].attributes.numNeg++;
                    }
                    updateBoltInformation(currentBolt);
                });

        	}
        	
        });

        $('#end-bolt').click(function() {

            app.f7.confirm('Are you sure you want to end this lecture?', 'electurefy', function() {


                // socket.emit('bolt ended', bolts[bolts.length - 1]);
                currentBoltLive = false;
                $('#send-bolt').parents('.row').show();
                $('#end-bolt').parents('.row').hide();
                $('.panel-title').text('MOST RECENT BOLT');

                var newBoltInfo = bolts[bolts.length - 1];
                var responseType = (newBoltInfo.attributes.numPos >= newBoltInfo.attributes.numNeg) ? true : false;
                saveResponsesToDatabase(responseType, newBoltInfo);
            });
        	
        });

    }

    var saveResponsesToDatabase = function(responseType, newBoltInfo) {
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
                socket.emit('bolt ended', newBolt.id);
                
            }, 
            error: function(newBolt, error) {
                console.log('Error when trying to save new Bolt to database: ' + error);
            }
        })

    };

    var setTimer = function(lectureStartTime) {
    	var diff = Math.abs(new Date() - lectureStartTime);
        var lectureMinutes = Math.floor(diff / 60000);
       	var lectureSeconds = Math.floor((diff/1000)) % (60);
       	if (lectureSeconds < 10) lectureSeconds = '0' + lectureSeconds;
       	var lectureTime = lectureMinutes + ':' + lectureSeconds;

       	$('.class-time').text(lectureTime);
       	return lectureTime;
    }
 
    return {
        render: render
    }
});
