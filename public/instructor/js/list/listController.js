define(["js/list/listView"], function(ListView) {

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