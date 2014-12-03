define(['hbs!js/lecture_stats/lecture_stats'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {
        $('.lecture_stats-page').html( viewTemplate() );

        $('.lecture_stats-header').text("CS 247 Statistics");
        $('#lectureNumTitle').text("Lecture " + params.model.lectureNum);
        $('#lectureDateTitle').text(params.model.lectureDate);



        

    }
 
    return {
        render: render
    }
});
