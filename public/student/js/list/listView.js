define(['app', 'hbs!js/list/contact-list-item'], function(app, viewTemplate) {
    var $ = Framework7.$;
    // var myApp = new Framework7({
    // 	modalButtonOk: 'Respond'
    // });
    var socket = io();
    
    // console.log(app);

    function render(params) {

        
        var alreadyLoaded = false;

        $('.contacts-list ul').html(viewTemplate(params.model));
    
        /* Receiving Bolt Socket */
        socket.on('bolt sent', function(){
	        app.f7.confirm('Your professor has sent you a new Bolt', 'electurefy', function() {
                // add Information about  the contact page rendering
                if (alreadyLoaded) {
                    app.router.load('contact', {courseNumber: 'CS 147', showResponseSection: 'true'});
                    app.mainView.loadPage('contact.html?courseNumber=CS 147&showResponseSection=true');
                } else {
                    app.mainView.loadPage('contact.html?courseNumber=CS 147&showResponseSection=true');
                    alreadyLoaded = true;
                }
	        	
	        });
      	});

    }
 
    return {
        render: render
    };
});