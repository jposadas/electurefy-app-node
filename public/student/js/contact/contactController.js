define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;

    console.log(app);
 
    function init() {
        queryParse();
    }

    function queryParse() {
        var query = new Parse.Query("Bolts");
        query.descending("BoltNum").find().then(function(bolts) {
            ContactView.render({ model: bolts });
        });
    }
 
    return {
        init: init
    };
});