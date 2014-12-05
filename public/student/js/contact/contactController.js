define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;

    console.log(app);
 
    function init(query) {
        console.log('===================== QUERY ========================');
        console.log(query);
        console.log('===================== QUERY ========================');
        var showResponseSection = (query.showResponseSection === 'true') ? true : false;
        queryParse(query.courseNumber, showResponseSection);
    }

    function queryParse(courseNumber, showResponseSection) {
        var query = new Parse.Query("Bolts");
        query.descending("BoltNum").find().then(function(bolts) {

            var showCurrent = true;

            if(courseNumber == "CS 247") {
                bolts = bolts.slice(bolts.length - 3,bolts.length);
                showCurrent = false;
            }
            
            ContactView.render({ 
                model: bolts, 
                showCurrent: showCurrent, 
                courseNumber: courseNumber, 
                showResponseSection: showResponseSection 
            });
        });
    }
 
    return {
        init: init
    }
});