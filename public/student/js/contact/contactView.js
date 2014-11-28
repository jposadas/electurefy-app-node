define(['hbs!js/contact/contact'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.contact-page .bolt-list ul').html(viewTemplate(params.model));
 
    }
 
    return {
        render: render
    }
});
