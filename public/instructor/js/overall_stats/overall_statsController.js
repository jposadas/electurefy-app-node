define(["app","js/overall_stats/overall_statsView"], function(app, Overall_statsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        if (query && query.id) {

            var query = new Parse.Query("Lectures");
            query.equalTo("objectId", "8H6DxULgQz");
            query.find().then(function(currentLecture) {
                
                var lectureNumber = currentLecture[0].attributes.LectureNum;
                var lectureDayOfWeek = currentLecture[0].attributes.DayOfWeek;
                var lectureDateMonth = currentLecture[0].attributes.Date.getMonth() + 1;
                var lectureDateDay = currentLecture[0].attributes.Date.getDate();

                var lectureStartTime = currentLecture[0].attributes.startLecture;

                var boltsQuery = new Parse.Query("Bolts");
                boltsQuery.find().then(function(bolts) {

                    Overall_statsView.render({ model: 
                    { lectureNumber: lectureNumber,
                        lectureDate: lectureDayOfWeek + ' ' + lectureDateMonth + '/' + lectureDateDay,
                        lectureStartTime: lectureStartTime,
                        lectureBolts: bolts
                    } 
                });

                });

                
            });
        
        }
    }
 
    return {
        init: init
    };
});