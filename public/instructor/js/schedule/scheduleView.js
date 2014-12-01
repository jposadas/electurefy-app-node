define(['hbs!js/schedule/schedule'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.schedule-page').html( viewTemplate({}));

        // $('.schedule-page').html( viewTemplate( 
        // 	{ lectureNumber: params.model.lectureNumber,
        // 	  lectureDate: params.model.lectureDate,
        // 	  lectureTime: params.model.lectureTime
        // 	}
       	// ));

        var currentLectureTime;

        $('.schedule-header').text("CLASS NAME HERE");





        // $('#up-carrot').click(function() {
            

        // }

        // $('#down-carrot').click(function() {


        // }

    }

 
    return {
        render: render
    }
});
