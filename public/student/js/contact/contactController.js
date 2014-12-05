define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;

    console.log(app);
 
    function init(query) {
        queryParse('CS 147');
    }

    function queryParse(courseNumber) {
        var query = new Parse.Query("Bolts");
        query.descending("BoltNum").find().then(function(bolts) {
            ContactView.render({ model: bolts, courseNumber: courseNumber });
        });
    }
 
    return {
        init: init
    }
});