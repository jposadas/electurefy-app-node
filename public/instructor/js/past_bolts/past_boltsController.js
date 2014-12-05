define(["app","js/past_bolts/past_boltsView"], function(app, Past_boltsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        // Past_boltsView.render();
        queryParse(query.courseNumber);
    }

    function queryParse(courseNumber) {
      var query = new Parse.Query("Bolts");
      query.descending("BoltNum").find().then(function(bolts) {
          Past_boltsView.render({ model: bolts, courseNumber: courseNumber });
      });
	  }

 
    return {
        init: init
    };
});