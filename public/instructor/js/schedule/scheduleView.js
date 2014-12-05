define(['hbs!js/schedule/schedule'], function(viewTemplate) {
    var $ = Framework7.$;
    var week3Counter = 0;
    var week2Counter = 0;
    var week1Counter = 0;


    function render(params) {

        $('.schedule-page').html( viewTemplate(
            {}
            ));
        
        $('.home').click(function() {
            console.log("clicked home");
            location.reload();
        });

        $('.schedule-header').text(params.model.courseNumber);
        $('#lecture6').text(params.model.lectureDate6);
        

        $('#week3').click(function() {
            if(week3Counter++ % 2 == 0) {
                $('#down-carrot3').hide();
                $('#up-carrot3').css("display",  "inline-block");
                $('#lectures3').show();
            } else {
                $('#up-carrot3').hide();
                $('#down-carrot3').css("display",  "inline-block");
                $('#lectures3').hide();
            }
        });

        $('#week2').click(function() {
            if(week2Counter++ % 2 == 0) {
                $('#down-carrot2').hide();
                $('#up-carrot2').css("display",  "inline-block");
                $('#lectures2').show();
            } else {
                $('#up-carrot2').hide();
                $('#down-carrot2').css("display",  "inline-block");
                $('#lectures2').hide();
            }
        });

        $('#week1').click(function() {
            if(week1Counter++ % 2 == 0) {
                $('#down-carrot1').hide();
                $('#up-carrot1').css("display",  "inline-block");
                $('#lectures1').show();
            } else {
                $('#up-carrot1').hide();
                $('#down-carrot1').css("display",  "inline-block");
                $('#lectures1').hide();
            }
        });

    }

 
    return {
        render: render
    }
});
