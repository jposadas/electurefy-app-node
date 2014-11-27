define(["app", "js/list/listView"], function(app, ListView) {

	console.log(app);

	function init() {
		var classes = loadClasses();
	}

	function loadClasses() {
		var query = new Parse.Query("MyClasses");
		query.find().then(function(classes) {
			ListView.render({ model: classes });
		});
	}

	return {
		init: init
	};

});