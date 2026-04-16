/* ========================================
   Page Load
   ======================================== */

/* Refresh page on browser resize */
jQuery(function($) {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  $(window).resize(function() {
    if (windowWidth != $(window).width() || windowHeight != $(window).height()) {
      location.reload();
    }
  });
});

/* ========================================
   Desktop Hover / Mobile Fallback
   ======================================== */

if ($(window).width() > 960) {
  $("a.main").hover(function() {
    $(this).siblings("div").removeClass("hide-me");
  }, function() {
    $(this).siblings("div").addClass("hide-me");
  });
} else {
  $('.follower').addClass('hide-me');
  $('.container').show('.thumbnail');
}

/* ========================================
   Image Shuffle
   ======================================== */

$(".shuffle-me").shuffleImages({
  trigger: "imageMouseMove",
  triggerTarget: $(".main"),
  mouseMoveTrigger: 15,
  hoverTrigger: 200,
  scrollTrigger: 50,
  target: "> img"
});

/* ========================================
   Cursor Follower
   ======================================== */

var parents = document.querySelectorAll('.container');

function onMouseMove(e) {
  var follower = this.querySelector('.follower');
  TweenMax.to(follower, 0, {
    x: e.offsetX,
    y: e.offsetY,
    ease: Power4.easeOut
  });
}

function init() {
  for (var i = 0; i < parents.length; i++) {
    parents[i].addEventListener('mousemove', onMouseMove);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  window.onload = function() {
    TweenMax.set('.follower', {
      xPercent: -50,
      yPercent: -50
    });
    init();
  };
});

/* ========================================
   Page Entrance Animations
   ======================================== */

TweenMax.set('.container', { autoAlpha: 0, y: 14 });
TweenMax.staggerTo('.container', 1.4, { autoAlpha: 1, y: 0, ease: Power2.easeOut, delay: 0.4 }, 0.2);

/* ========================================
   Menu Animation
   ======================================== */

TweenMax.set('.menu-window', { autoAlpha: 0, height: '100vh' });
TweenMax.set('.menu-item', { autoAlpha: 0, y: 40 });
TweenMax.set('.menu-item-2', { autoAlpha: 0, y: 40 });

var tl = new TimelineMax({ paused: true });

tl.to('.menu-window', 0.4, { autoAlpha: 1, ease: Power2.easeOut });
tl.staggerTo('.menu-item', 0.6, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1, '-=0.1');
tl.staggerTo('.menu-item-2', 0.5, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.08, '-=0.5');

var menuOpen = false;

$('#menu-button').click(function() {
  if (!menuOpen) {
    $('#button').css("color", "white");
    $('#button').css("border", ".5px solid white");
    tl.timeScale(1).play();
    menuOpen = true;
  } else {
    tl.timeScale(1.4).reverse();
    $('#button').css("color", "black");
    $('#button').css("border", "1px solid black");
    menuOpen = false;
  }
  $('.addwhite').toggleClass('white');
});

/* ========================================
   Tangy Theme
   ======================================== */

$('#button').click(function() {
  var tangyEnabled = document.body.classList.toggle('tangy');
  localStorage.setItem('tangy-enabled', tangyEnabled);
});

if (JSON.parse(localStorage.getItem('tangy-enabled'))) {
  document.body.classList.add('tangy');
}

/* ========================================
   Hamburger Icon Toggle
   ======================================== */

function myFunction(x) {
  x.classList.toggle("change");
}
