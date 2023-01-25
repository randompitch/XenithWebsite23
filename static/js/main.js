
$(document).ready(function () {
  
  
  // setTimeout(function () {
    
  // }, 3200);


  $(window).scroll(function () {
    var nav = $("#navbarMain");
    var top = 200;
    if ($(window).scrollTop() >= top) {
      nav.addClass("background-xenith");
    } else {
      nav.removeClass("background-xenith");
    }
  });
  let cmmt=0;
  var refreshIntervalId=setInterval(function () {
    if(cmmt>2000)
    {
      $("#preLoader").addClass("uk-hidden");
      $("#postLoader").removeClass("uk-hidden");
      clearInterval(refreshIntervalId);
    }
    console.log(Math.floor(cmmt));
    cmmt++;
  }, 1000);
});

const setActiveNav = (id) => {
  if (id > 8) return;
  if (id < 1) return;

  var ids = [1, 2, 3, 4, 5, 6, 7, 8];
  ids.map((i) =>
    document.getElementById(`ni-${i}`).classList.remove("active")
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
  'gallery': 5,
  'team': 6,
  'sponsors': 7,
  'contact': 8
}

window.addEventListener("scroll", () => {
  let current = "postLoader";
  const sections = [
    document.getElementById("postLoader"),
    document.getElementById("about"),
    document.getElementById("event"),
    document.getElementById("timeline"),
    document.getElementById("gallery"),
    document.getElementById("team"),
    document.getElementById("sponsors"),
    document.getElementById("contact"),
  ];

  sections.forEach(section => {
    const secTop = section.offsetTop;
    const secHt = section.clientHeight;
    if (scrollY >= (secTop - secHt / 4)) {
      current = section.getAttribute('id')
      // console.log(current);
    }
    if(section.getAttribute('id')=='sponsors')
    {
      if(scrollY >= (secTop + section.clientHeight/4))
      {
        current = 'contact'
      }
    }
  })
  setActiveNav(navMap[current]);
});

const toggleAbout = () => {
  const aboutToggle = document.getElementById("readtoggle");
  if (aboutToggle.classList.contains("more")) {
    aboutToggle.classList.remove("more");
    aboutToggle.classList.add("less");
    aboutToggle.innerHTML = "...read less";
  } else {
    aboutToggle.classList.remove("less");
    aboutToggle.classList.add("more");
    aboutToggle.innerHTML = "...read more";
  }
};
let cmt=1;
setInterval(function () {
  var crd = document.getElementsByClassName('col-md-5');
  for (var l=0;l<crd.length;l++)
  {
    
    if(crd[l].classList.contains('end') && crd[l].classList.contains('uk-active') &&cmt<5 )
    {
      fetch("./sponsorData.json")
      .then((res) => res.json())
      .then((data) => {
        data.map((sponsor) =>
          createSponsorCard(sponsor.name, sponsor.type, sponsor.image, sponsor.link)
        );
      })
      .catch((err) => console.error(err));
      

    }
    
   
  }
 
  
}, 1000);
let cntt=0;
const createSponsorCard = (name, spType, imageUrl, link = "") => {
  var parent = document.createElement("div");
  parent.className = "col-md-5";
  parent.style.marginBottom = "140px";
  parent.style.marginTop = "50px";
  var card = document.createElement("div");
  card.className = "sponsor-card";

  var cardContainer = document.createElement("div");
  cardContainer.className = "container";

  var image = document.createElement("img");
  image.className="sponsorimage"
  image.src = imageUrl;
  image.width = 100;
  image.height = 20;
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
  if(cntt==0)
  {
    parent.className+=" start";
  }
  if(cntt==sponsorlength-1)
  {
    parent.className+=" end";
    cnt=0;
  }
  cntt++;
};
var sponsors = [];
var sponsorlength=0;

fetch("./sponsorData.json")
  .then((res) => res.json())
  .then((data) => {
    sponsorlength=data.length;

  })
  .catch((err) => console.error(err));

    fetch("./sponsorData.json")
    .then((res) => res.json())
    .then((data) => {
      data.map((sponsor) =>
        createSponsorCard(sponsor.name, sponsor.type, sponsor.image, sponsor.link)
      );
    })
    .catch((err) => console.error(err));
  





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


var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("menuToggle").style.top = "0";
  } else {
    document.getElementById("menuToggle").style.top = "0";
  }
  prevScrollpos = currentScrollPos;
}

jQuery(document).on('scroll', function(){
  jQuery('.check1').css("padding-top", Math.max(5 + 0.15*window.scrollY, 1) + "vh");
  // document.getElementById("landingpage").style.height = "90vh";
  })
var items = document.querySelectorAll(".timeline li");

function isElementInViewport(el){
    var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
    for(var i = 0; i < items.length; i++){
        if (isElementInViewport(items[i])){
            if(!items[i].classList.contains("in-view")){
                items[i].classList.add("in-view");
            }
        } else if(items[i].classList.contains("in-view")){
            items[i].classList.remove("in-view");
        }
    }
}

 window .addEventListener("load", callbackFunc);
 window.addEventListener("scroll", callbackFunc);

 $('.box').click(function() {
  this.focus()
  
});

setInterval(function () {
  var video = document.getElementById('myVideo');
  if(Math.floor(video.currentTime)+4==Math.floor(video.duration))
  {
    video.currentTime=2;
  }
  
}, 1000);


(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy,
      dayMonth = "02/10/",
      birthday = dayMonth + yyyy;
  
  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end
  
  const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
          

        //do something later when date is reached
        // if (distance < 0) {
        //   document.getElementById("headline").innerText = "It's my birthday!";
        //   document.getElementById("countdown").style.display = "none";
        //   document.getElementById("content").style.display = "block";
        //   clearInterval(x);
        // }
        //seconds
      }, 0)
  }());