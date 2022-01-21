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


var counter = {
  // (A) HELPER - CREATE HR/MIN/SEC CELL
  //  txt : text for the cell (all small letters)
  square : (txt) => {
    let cell = document.createElement("div");
    cell.className = `cell ${txt}`;
    cell.innerHTML = `<div class="digits">0</div><div class="text">${txt}</div>`;
    return cell;
  },

  // (B) INITIALIZE COUNTDOWN TIMER
  //  target : target html container
  //  remain : seconds to countdown
  //  after : function, do this when countdown end (optional)
  attach : (instance) => {
    // (B1) GENERATE HTML
    instance.target.className = "countdown";
    if (instance.remain >= 86400) {
      instance.target.appendChild(counter.square("Days"));
      instance.days = instance.target.querySelector(".Days .digits");
    }
    if (instance.remain >= 3600) {
      instance.target.appendChild(counter.square("Hours"));
      instance.hours = instance.target.querySelector(".Hours .digits");
    }
    if (instance.remain >= 60) {
      instance.target.appendChild(counter.square("Minutes"));
      instance.mins = instance.target.querySelector(".Minutes .digits");
    }
    instance.target.appendChild(counter.square("Seconds"));
    instance.secs = instance.target.querySelector(".Seconds .digits");

    // (B2) TIMER
    instance.timer = setInterval(() => { counter.ticker(instance); }, 1000);
  },

  // (C) COUNTDOWN TICKER
  ticker : (instance) => {
    // (C1) TIMER STOP
    instance.remain--;
    if (instance.remain<=0) {
      clearInterval(instance.timer);
      instance.remain = 0;
      if (typeof instance.after == "function") { instance.after(); }
    }

    // (C2) CALCULATE REMAINING DAYS/HOURS/MINS/SECS
    // 1 day = 60 secs * 60 mins * 24 hrs = 86400 secs
    // 1 hr = 60 secs * 60 mins = 3600 secs
    // 1 min = 60 secs
    let secs = instance.remain;
    let days = Math.floor(secs / 86400);
    secs -= days * 86400;
    let hours = Math.floor(secs / 3600);
    secs -= hours * 3600;
    let mins  = Math.floor(secs / 60);
    secs -= mins * 60;

    // (C3) UPDATE HTML
    instance.secs.innerHTML = secs;
    if (instance.mins !== undefined) { instance.mins.innerHTML = mins; }
    if (instance.hours !== undefined) { instance.hours.innerHTML = hours; }
    if (instance.days !== undefined) { instance.days.innerHTML = days; }
  },

  // (D) HELPER - CONVERT DATE/TIME TO REMAINING SECONDS
  //  till : (date object) countdown to this date/time
  toSecs : (till) => {
    till = Math.floor(till / 1000);
    let remain = till - Math.floor(Date.now() / 1000);
    return remain<0 ? 0 : remain;
  }
};

// (E) ATTACH COUNTDOWN TIMER
window.onload = () => {
  counter.attach({
    // TARGET + REMAINING TIME
    target : document.getElementById("demo"),
    //emain : 86500,
    
    // COUNTDOWN TO SPECIFIC DATE
     remain : counter.toSecs(new Date("2022-01-26")),
    
    // OPTIONAL - RUN THIS ON TIMER END
    after : () => { alert("TIMER HAS ENDED!"); }
  });
};