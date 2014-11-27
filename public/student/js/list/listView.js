define(['app', 'hbs!js/list/contact-list-item'], function(app, viewTemplate) {
    var $ = Framework7.$;
    // var myApp = new Framework7({
    // 	modalButtonOk: 'Respond'
    // });
    var socket = io();
    // console.log(app);

    function render(params) {
        
        // console.log(app);
        $('.contacts-list ul').html(viewTemplate(params.model));
    
        /* Receiving Bolt Socket */
        socket.on('bolt sent', function(){
	        app.f7.confirm('Your professor has sent you a new Bolt', 'electurefy', function() {
	        // 	console.log(app);
	        	app.mainView.loadPage('contact.html');
	        });
      	});

    }
 
    return {
        render: render
    };
});