define(["app","js/lecture_stats/lecture_statsView"], function(app, Lecture_statsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){

        var dbQuery = new Parse.Query("PreviousLectures");
        dbQuery.equalTo('LectureNum', parseInt(query.lectureNum));
        dbQuery.descending('BoltNum').find({
            success: function(bolts) {
                console.log('success');
                console.log(bolts);
                // Lecture_stats_past_boltsView.render({ model: bolts, lectureNum: lectureNum });
                Lecture_statsView.render({ model: 
                    {   lectureNum: query.lectureNum,
                        lectureDate: query.lectureDate,
                        lectureDescription: query.lectureDescription,
                        pastBolts: bolts
                    }
                });
            },
            error: function(error, bolts) {
                console.log('error: ' + error);
            }
        });

    }
 
    return {
        init: init
    };
});