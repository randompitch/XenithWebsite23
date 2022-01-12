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
clearInterval(refreshIntervalId);},3500);
var refresh = setInterval(function(){
    (function () {
        "use strict";
        var items = document.querySelectorAll(".timeline li");
        function isElementInViewport(el) {
          var rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }
      
        function callbackFunc() {
          for (var i = 0; i < items.length; i++) {
            if (isElementInViewport(items[i])) {
              items[i].classList.add("in-view");
            }
          }
        }
      
        // listen for events
        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);
      })();
clearInterval(refresh);},3500);

const createTeamCard = (name, designation, imageUrl) => {
  var parent = document.createElement("div");
  parent.className = "col-md-4 col-sm-1";

  var card = document.createElement("div");
  card.className = "dcard";

  for (var i = 0; i < 6; i++) {
    var triggerDiv = document.createElement("div");
    triggerDiv.className = "trigger";
    card.appendChild(triggerDiv);
  }

  var imageCard = document.createElement("div");
  imageCard.className = "image-card card";
  imageCard.style.backgroundImage = `url(${imageUrl})`;

  var caption = document.createElement("div");
  caption.className = "caption";

  imageCard.appendChild(caption);

  var content = document.createElement("div");
  content.className = "content";

  for (var i = 0; i < 3; i++) {
    var br = document.createElement("br");
    content.appendChild(br);
  }

  var memberName = document.createElement("h2");
  memberName.innerHTML = name;

  var desig = document.createElement("h3");
  desig.innerHTML = designation;

  var br = document.createElement("br");

  content.appendChild(memberName);
  content.appendChild(br);
  content.appendChild(desig);

  imageCard.appendChild(content);
  card.appendChild(imageCard);
  parent.appendChild(card);
  document.getElementById("teamContainer").appendChild(parent);
};

const createSponsorCard = (name, spType, imageUrl) => {
  var parent = document.createElement("div");
  parent.className = "col-md-4";
  parent.style.marginTop = "30px";

  var card = document.createElement('div');
  card.className = "sponsor-card"

  var cardContainer = document.createElement('div');
  cardContainer.className = "container"

  var image = document.createElement('img')
  image.src = imageUrl
  image.width = 200;
  image.height = 100;


  var heading = document.createElement('h1')
  heading.innerHTML = name;

  var type = document.createElement('span')
  type.innerHTML = spType;

  cardContainer.appendChild(image);
  cardContainer.appendChild(type);
  cardContainer.appendChild(heading)
  card.appendChild(cardContainer);
  parent.appendChild(card);
  document.getElementById("sponsorContainer").appendChild(parent);
};

var images = [];
fetch("./teamData.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((image) =>
      createTeamCard(image.name, image.designation, image.image)
    );
  })
  .catch((err) => console.error(err));

var sponsors = [];
fetch("./sponsorData.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((sponsor) => createSponsorCard(sponsor.name, sponsor.type, sponsor.image));
  })
  .catch((err) => console.error(err));
