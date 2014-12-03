define(['hbs!js/overall_stats/overall_stats'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.overall_stats-page').html( viewTemplate( 

       	));

    }
 
    return {
        render: render
    }
});
