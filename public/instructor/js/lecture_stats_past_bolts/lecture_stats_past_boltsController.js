define(["app","js/lecture_stats_past_bolts/lecture_stats_past_boltsView"], function(app, Lecture_stats_past_boltsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        queryParse(query.lectureNum);
    }

    function queryParse(lectureNum) {
      var query = new Parse.Query("PreviousLectures");
      query.equalTo('LectureNum', parseInt(lectureNum));
      query.find({
        success: function(bolts) {
          console.log('success');
          Lecture_stats_past_boltsView.render({ model: bolts, lectureNum: lectureNum });
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