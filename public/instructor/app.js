
/* Parse */
Parse.initialize("7QV2Jv0CLSlTFNgpFEc3JPlhCNIAD3xJtfBWgo1T", "VHJ2x20bfE22mceEeuPP1qcdld2DwjhHQbjZiL94");

require.config({
    paths: {
        handlebars: "/lib/handlebars",
        text: "/lib/text",
        hbs: "/lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});

define('app', ['js/router'], function(Router) {
    
    Router.init();
    var f7 = new Framework7({
        modalTitle: 'electurefy',
        animateNavBackIcon: true
    });
    
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    
    return {
        f7: f7,
        mainView: mainView,
        router: Router
    };
});   