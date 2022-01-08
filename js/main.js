$(document).ready(function () {

    setTimeout(function () {
        $('#preLoader').addClass('uk-hidden');
        $('#postLoader').removeClass('uk-hidden');
    }, 3000);

    $(window).scroll(function () {
        var nav = $('#navbarMain');
        var top = 200;
        if ($(window).scrollTop() >= top) {
            nav.addClass('background-xenith');


        } else {
            nav.removeClass('background-xenith');

        }
    });

});
const signs = document.querySelectorAll('x-sign')
const randomIn = (min, max) => (
    Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
    const ms = randomIn(2000, 4000)
    el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
    mixupInterval(el)
    el.addEventListener('webkitAnimationIteration', () => {
        mixupInterval(el)
    })
})


var refreshIntervalId = setInterval(function(){
    var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
        invert: false,
    },
    // autoHeight: true,
    pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
    }
});
clearInterval(refreshIntervalId);},4000);
