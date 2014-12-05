define(['hbs!js/lecture_stats/lecture_stats'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {
        $('.lecture_stats-page').html( viewTemplate() );

        $('.lecture_stats-header').text("CS 247 Lecture Statistics");
        $('#lectureNumTitle').text("Lecture " + params.model.lectureNum);
        $('#lectureDescriptionTitle').text(params.model.lectureDescription);
        $('#lectureDateTitle').text(params.model.lectureDate);
        $('#lecture-graph').src("lecture" + params.model.lectureNum + "-chart.png");
    }
 
    return {
        render: render
    }
});
