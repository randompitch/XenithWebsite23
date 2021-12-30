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
            anchor.addClass("c-white");

        } else {
            nav.removeClass('background-xenith');
            anchor.removeClass("c-white");
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
const card = document.querySelector(".card");
const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
const THRESHOLD = 15;

function handleHover(e) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
}

function resetStyles(e) {
    card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

if (!motionMatchMedia.matches) {
    card.addEventListener("mousemove", handleHover);
    card.addEventListener("mouseleave", resetStyles);
}
