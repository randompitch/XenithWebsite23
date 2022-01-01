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

const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
const THRESHOLD = 2;
if (!motionMatchMedia.matches) {
    const card = document.querySelectorAll('.image-card').forEach(item => {
        item.addEventListener('mousemove', event => {

            const { clientX, clientY, currentTarget } = event;
            const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
            const xVal = event.layerX;
            const yVal = event.layerY;
            const rotateX = 20 * ((xVal - clientWidth / 2) / clientWidth);
            const rotateY = -20 * ((yVal - clientHeight / 2) / clientHeight);
            item.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;



        })
        item.addEventListener('mouseleave', event => {

            item.style.transform = `perspective(${event.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;

        })
    });
}


