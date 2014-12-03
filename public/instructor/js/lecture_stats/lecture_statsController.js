define(["app","js/lecture_stats/lecture_statsView"], function(app, Lecture_statsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        Lecture_statsView.render({model: 
        	{	lectureNum: query.lectureNum,
        		lectureDate: query.lectureDate
        	}
        });
    }
 
    return {
        init: init
    };
});