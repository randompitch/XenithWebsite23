$(document).ready(function() {
 
    setTimeout(function(){
        $('#preLoader').addClass('uk-hidden');
        $('#postLoader').removeClass('uk-hidden');
    }, 3000);

    $(window).scroll(function() {
        var nav = $('#navbarMain');
        var top = 200;
        if ($(window).scrollTop() >= top) {
            nav.addClass('background-xenith');
    
        } else {
            nav.removeClass('background-xenith');
        }
    });

});