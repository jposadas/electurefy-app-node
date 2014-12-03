define(["app","js/overall_stats/overall_statsView"], function(app, Overall_statsView) {
 
    var state = {isNew: false};
    var contact = null;
 
    function init(query){
        Overall_statsView.render();
    }
 
    return {
        init: init
    };
});