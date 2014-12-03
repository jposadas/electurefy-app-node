define(["app","js/schedule/scheduleView"], function(app, ScheduleView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        console.log(query);
        if (query && query.courseNumber) { 
            var lecture6query = new Parse.Query("Lectures");
            lecture6query.equalTo("objectId", "U9YQRz6UTg");
            lecture6query.find().then(function(lecture6) {
                var dayOfWeek = lecture6[0].attributes.DayOfWeek;
                var lectureDateMonth = lecture6[0].attributes.Date.getMonth() + 1;
                var lectureDateDay = lecture6[0].attributes.Date.getDate();

                console.log(lecture6query);
                ScheduleView.render({model:
                { courseNumber: query.courseNumber,
                    lectureDate6: dayOfWeek + ' ' + lectureDateMonth + '/' + lectureDateDay
                }
                });
            });
        }


    }
 
    return {
        init: init
    };
});