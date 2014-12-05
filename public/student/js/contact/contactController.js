define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;

    console.log(app);
 
    function init(query) {
        queryParse(query.courseNumber);
    }

    function queryParse(courseNumber) {
        var query = new Parse.Query("Bolts");
        query.descending("BoltNum").find().then(function(bolts) {
            console.log("before: ");

            console.log(bolts);
            var showCurrent = true;

            if(courseNumber == "CS 247") {
                bolts = bolts.slice(bolts.length - 3,bolts.length);
                showCurrent = false;
            }
            console.log(bolts);
            ContactView.render({ model: bolts, showCurrent: showCurrent, courseNumber: courseNumber });
        });
    }
 
    return {
        init: init
    }
});