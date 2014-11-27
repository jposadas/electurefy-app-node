define(['hbs!js/contact/contact'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        console.log('Rendering!');
        $('.contact-page').html( viewTemplate());
 
    }
 
    return {
        render: render
    }
});
