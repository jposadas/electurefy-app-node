define(['hbs!js/overall_stats/overall_stats'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.overall_stats-page').html( viewTemplate( 
        	{ lectureNumber: params.model.lectureNumber,
        	  lectureDate: params.model.lectureDate,
        	  lectureTime: params.model.lectureTime
        	}
       	));

        var currentLectureTime;

        $('.overall_stats-header').text("Overall Class Statistics");

        currentLectureTime = setTimer(params.model.lectureStartTime);
        setInterval(function() {
        	currentLectureTime = setTimer(params.model.lectureStartTime);
        }, 1000);


        /*Slider */

        var bolts = params.model.lectureBolts;
        var numBolts = bolts.length;
        var currentBolt = bolts[numBolts - 1].attributes.BoltNum;

        var updateBoltInformation = function(currentBolt) {

        	console.log(currentBolt);

        	$('#negative-bolts').text(bolts[currentBolt - 1].attributes.numNeg);
	        $('#positive-bolts').text(bolts[currentBolt - 1].attributes.numPos);
	        $('#total-bolts').text(bolts[currentBolt - 1].attributes.totalResponses);
	        $('#timestamp-bolts').text(bolts[currentBolt - 1].attributes.timeOfBolt);
	        $('#bolt-number').text('Bolt ' + currentBolt);

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

        		currentBoltLive = true;
        		$('#end-bolt').show();
        		var newBolt = {
	        		attributes: {
	        			BoltNum: numBolts + 1,
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
        	}
        	
        });

        $('#end-bolt').click(function() {
        	currentBoltLive = false;
        	$(this).hide();
        })


    }

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
