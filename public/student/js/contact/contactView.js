define(['hbs!js/contact/contact'], function(viewTemplate) {
    var $ = Framework7.$;
 	console.log($);

    function render(params) {

    	var boltTime = params.model
        $('.contact-page .bolt-list ul').html(viewTemplate(params.model));
 
    }
 
    return {
        render: render
    }
});
