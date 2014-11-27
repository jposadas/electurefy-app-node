define(['hbs!js/list/contact-list-item'], function(viewTemplate) {
    var $ = Framework7.$;

    function render(params) {
    	console.log(params.model);
        $('.contacts-list ul').html(viewTemplate(params.model));
    }
 
    return {
        render: render
    };
});