define(['hbs!js/past_bolts/past_bolts'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.past_bolts-page').html( viewTemplate( { bolts: params.model }));
        $('.past_bolts-header').text('CS 147 Past Bolts');


        // $('.past_bolts-header').text("CS 147 Past Bolts");

    }
 
    return {
        render: render
    }
});
