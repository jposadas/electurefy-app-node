define(["app","js/contact/contactView"], function(app, ContactView) {
 
    var state = {isNew: false};
    var contact = null;

    console.log(app);
 
    function init() {
        queryParse();
    }

    function queryParse() {
        var query = new Parse.Query("Bolts");
        query.find().then(function(classes) {
            ContactView.render({ model: classes });
        });
    }
 
    return {
        init: init
    };
});