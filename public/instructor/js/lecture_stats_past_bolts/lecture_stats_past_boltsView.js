define(['hbs!js/lecture_stats_past_bolts/lecture_stats_past_bolts'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        $('.lecture_stats_past_bolts-page').html( viewTemplate( { bolts: params.model }));
        console.log(params.model);
        $('.lecture_stats_past_bolts-header').text('CS 247 Bolts');
        console.log(params);
        $('#top-lecture-num').text('Lecture ' + params.lectureNum);
        $('#total-responses').text(params.model.totalResponses + ' responses');

        $('.home').click(function() {
            console.log("clicked home");
            location.reload();
        });
    }
 
    return {
        render: render
    }
});
