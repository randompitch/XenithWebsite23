$(document).ready(function () {
  setTimeout(function () {
    $("#preLoader").addClass("uk-hidden");
    $("#postLoader").removeClass("uk-hidden");
  }, 3000);

  $(window).scroll(function () {
    var nav = $("#navbarMain");
    var top = 200;
    if ($(window).scrollTop() >= top) {
      nav.addClass("background-xenith");
    } else {
      nav.removeClass("background-xenith");
    }
  });
});

const setActive = (id) => {
  if (id > 7) return;
  if (id < 1) return;

  var ids = [1, 2, 3, 4, 5, 6, 7];
  ids.map((id) =>
    document.getElementById(`ni-${id}`).classList.remove("active")
  );
  document.getElementById(`ni-${id}`).classList.add("active");
};

const signs = document.querySelectorAll("x-sign");
const randomIn = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const mixupInterval = (el) => {
  const ms = randomIn(2000, 4000);
  el.style.setProperty("--interval", `${ms}ms`);
};

signs.forEach((el) => {
  mixupInterval(el);
  el.addEventListener("webkitAnimationIteration", () => {
    mixupInterval(el);
  });
});

const navMap = {
  'postLoader': 1,
  'about': 2,
  'event':3,
  'timeline': 4,
  'team': 5,
  'sponsors': 6,
  'contact': 7
}

window.addEventListener("scroll", () => {
  let current = "postLoader";
  const sections = [
    document.getElementById("postLoader"),
    document.getElementById("about"),
    document.getElementById("event"),
    document.getElementById("timeline"),
    document.getElementById("team"),
    document.getElementById("sponsors"),
    document.getElementById("contact")
  ];

  sections.forEach(section => {
    const secTop = section.offsetTop;
    const secHt = section.clientHeight;
    if (scrollY >= (secTop - secHt / 4)) {
      current = section.getAttribute('id')
    }
  })
  setActive(navMap[current]);
});

const toggleAbout = () => {
  const aboutToggle = document.getElementById("readtoggle");
  if (aboutToggle.classList.contains("more")) {
    aboutToggle.classList.remove("more");
    aboutToggle.classList.add("less");
    aboutToggle.innerHTML = ".Read Less";
  } else {
    aboutToggle.classList.remove("less");
    aboutToggle.classList.add("more");
    aboutToggle.innerHTML = "...Read More";
  }
};


const createSponsorCard = (name, spType, imageUrl, link = "") => {
  var parent = document.createElement("div");
  parent.className = "col-md-5";
  parent.style.marginBottom = "140px";
  parent.style.marginTop = "0px";
  var card = document.createElement("div");
  card.className = "sponsor-card";

  var cardContainer = document.createElement("div");
  cardContainer.className = "container";

  var image = document.createElement("img");
  image.src = imageUrl;
  image.width = 100;
  image.height = 50;
  image.onclick = () => window.open(link, "_blank", "noopener noreferrer");
  image.style.cursor = "pointer";

  var heading = document.createElement("h1");
  heading.innerHTML = name;

  var type = document.createElement("span");
  type.innerHTML = spType;

  cardContainer.appendChild(image);
  cardContainer.appendChild(type);
  cardContainer.appendChild(heading);
  card.appendChild(cardContainer);
  parent.appendChild(card);
  document.getElementById("sponsorContainer").appendChild(parent);
};
var sponsors = [];
fetch("./sponsorData.json")
  .then((res) => res.json())
  .then((data) => {
    data.map((sponsor) =>
      createSponsorCard(sponsor.name, sponsor.type, sponsor.image, sponsor.link)
    );
  })
  .catch((err) => console.error(err));
// var header = document.getElementById('1');

// function fadeOutOnScroll(element) {
//   if (!element) {
//     return;
//   }

//   var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
//   var elementHeight = element.offsetHeight;
//   var scrollTop = document.documentElement.scrollTop;

//   var opacity = 1;

//   if (scrollTop > distanceToTop) {
//     opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
//   }

//   if (opacity >= 0) {
//     element.style.opacity = opacity;
//   }
// }

function scrollHandler() {
  animateIfInView();
}

window.addEventListener('scroll', scrollHandler);

function animateIfInView() {
  $.each($('.wow'), function (key, value) {
    if (isElementInViewport($(value))) {
      $(value).addClass('wow-in-view');
    }
  });
}
// http://stackoverflow.com/a/7557433/5628
function isElementInViewport(el) {

  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}
$('#menu li').click(function () {
  var check = document.getElementById("menuclose");
  if (check.checked == true) {
    check.checked = false;
  }
});

$('input[type="checkbox"]').click(function (e) {
  e.stopPropagation();
});
var refresh = setInterval(function () {
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
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
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
  clearInterval(refresh);
}, 3500);
