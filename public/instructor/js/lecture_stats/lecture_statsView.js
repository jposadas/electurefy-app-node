define(['hbs!js/lecture_stats/lecture_stats'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {

        console.log(params.model.pastBolts);
        $('.lecture_stats-page').html( viewTemplate({
                pastBolts: params.model.pastBolts
            })
        );

        $('.lecture_stats-header').text("CS 247 Lecture Statistics");
        $('#lectureNumTitle').text("Lecture " + params.model.lectureNum);
        $('#lectureDescriptionTitle').text(params.model.lectureDescription);
        $('#lectureDateTitle').text(params.model.lectureDate);
        $('.lecture-graph').attr('src', "lecture-charts/lecture" + params.model.lectureNum + "-chart.png");
    
        $('.home').click(function() {
            console.log("clicked home");
            location.reload();
        });
    }
 
    return {
        render: render
    }
});
