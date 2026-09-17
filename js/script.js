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

if ($(window).width() >= 820) {
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
  mouseMoveTrigger: 40,
  hoverTrigger: 200,
  scrollTrigger: 50,
  target: "> img"
});

/* ========================================
   Cursor Follower (lerped)
   ======================================== */

var followerStates = [];
var FOLLOWER_LERP = 0.055;

function syncFollowerPosition(state, x, y) {
  state.targetX = x;
  state.targetY = y;
  state.currentX = x;
  state.currentY = y;
  TweenMax.set(state.follower, { x: x, y: y });
}

function initFollower(parent) {
  var follower = parent.querySelector('.follower');
  if (!follower) {
    return;
  }

  var state = {
    follower: follower,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0
  };

  parent.addEventListener('mouseenter', function(e) {
    syncFollowerPosition(state, e.offsetX, e.offsetY);
  });

  parent.addEventListener('mousemove', function(e) {
    state.targetX = e.offsetX;
    state.targetY = e.offsetY;
  });

  followerStates.push(state);
}

function tickFollowers() {
  for (var i = 0; i < followerStates.length; i++) {
    var state = followerStates[i];

    if (state.follower.classList.contains('hide-me')) {
      continue;
    }

    state.currentX += (state.targetX - state.currentX) * FOLLOWER_LERP;
    state.currentY += (state.targetY - state.currentY) * FOLLOWER_LERP;

    TweenMax.set(state.follower, {
      x: state.currentX,
      y: state.currentY
    });
  }

  requestAnimationFrame(tickFollowers);
}

function initFollowers() {
  var parents = document.querySelectorAll('.container');
  for (var i = 0; i < parents.length; i++) {
    initFollower(parents[i]);
  }
  requestAnimationFrame(tickFollowers);
}

document.addEventListener('DOMContentLoaded', function() {
  window.onload = function() {
    TweenMax.set('.follower', {
      xPercent: -50,
      yPercent: -50
    });
    initFollowers();
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

TweenMax.set('.menu-window', { opacity: 0, visibility: 'hidden' });
TweenMax.set('.menu-item', { autoAlpha: 0, y: 40 });
TweenMax.set('.menu-item-2', { autoAlpha: 0, y: 40 });

var tl = new TimelineMax({
  paused: true,
  onReverseComplete: function() {
    TweenMax.set('.menu-window', { visibility: 'hidden', pointerEvents: 'none' });
  }
});

tl.to('.menu-window', 0.4, { opacity: 1, ease: Power2.easeOut });
tl.staggerTo('.menu-item', 0.6, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.1, '-=0.1');
tl.staggerTo('.menu-item-2', 0.5, { autoAlpha: 1, y: 0, ease: Power3.easeOut }, 0.08, '-=0.5');

var menuOpen = false;

$('#menu-button').click(function() {
  if (!menuOpen) {
    $('#button').css("color", "white");
    $('#button').css("border", ".5px solid white");
    TweenMax.set('.menu-window', { visibility: 'visible', pointerEvents: 'auto' });
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

/* ========================================
   Video Play / Pause Toggle
   ======================================== */

document.querySelectorAll('.video2up').forEach(function(group) {
  var videos = group.querySelectorAll('video');
  var toggle = group.querySelector('.video-toggle');

  if (!videos.length || !toggle) {
    return;
  }

  toggle.addEventListener('click', function() {
    var isPaused = Array.prototype.some.call(videos, function(video) {
      return video.paused;
    });

    if (isPaused) {
      Array.prototype.forEach.call(videos, function(video) {
        video.play();
      });
      toggle.classList.remove('is-paused');
      toggle.setAttribute('aria-label', 'Pause video');
    } else {
      Array.prototype.forEach.call(videos, function(video) {
        video.pause();
      });
      toggle.classList.add('is-paused');
      toggle.setAttribute('aria-label', 'Play video');
    }
  });
});

document.querySelectorAll('.videoWrapper').forEach(function(wrapper) {
  if (wrapper.closest('.video2up')) {
    return;
  }

  var video = wrapper.querySelector('video');
  var toggle = wrapper.querySelector('.video-toggle');

  if (!video || !toggle) {
    return;
  }

  toggle.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      toggle.classList.remove('is-paused');
      toggle.setAttribute('aria-label', 'Pause video');
    } else {
      video.pause();
      toggle.classList.add('is-paused');
      toggle.setAttribute('aria-label', 'Play video');
    }
  });
});
