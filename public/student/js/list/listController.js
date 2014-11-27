define(["app", "js/list/listView", "js/contact/contactView"], function(app, ListView, ContactView) {

	console.log(app);

	function init() {
		var classes = loadClasses();
	}

	function loadClasses() {
		var query = new Parse.Query("MyClasses");
		query.find().then(function(classes) {
			ListView.render({ model: classes, ContactView: ContactView });
		});
	}

	return {
		init: init
	};

});