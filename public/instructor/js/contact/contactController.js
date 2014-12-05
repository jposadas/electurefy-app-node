define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){

        console.log('============== BACK IN CONTROLLER =================');

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

                boltsQuery.descending('BoltNum').find().then(function(descendingBolts) {

                    ContactView.render({ model:
                        { lectureNumber: lectureNumber,
                            lectureDate: lectureDayOfWeek + ' ' + lectureDateMonth + '/' + lectureDateDay,
                            lectureStartTime: lectureStartTime,
                            lectureBolts: bolts,
                            descendingBolts: descendingBolts
                        } 
                    }); 
                });
            });    
        });
    }
 
    return {
        init: init
    };
});