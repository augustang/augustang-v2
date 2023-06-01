/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    $('body').hide();
    $(window).on('load', function() {
        $('body').show();
    });
});
//refresh page on browser resize

jQuery(function($){
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();

  $(window).resize(function() {
    if(windowWidth != $(window).width() || windowHeight != $(window).height()) {
      location.reload();
      return;
    }
  });
});

if ($(window).width() > 960) {
   $("a.main").hover(function() {
        $(this).siblings("div").removeClass("hide-me");
    }, function() {
        $(this).siblings("div").addClass("hide-me");
    });
}
else {
    $('.follower').addClass('hide-me');
    $('.container').show('.thumbnail');
}

//shuffle
$(".shuffle-me").shuffleImages({
   trigger: "imageMouseMove", 
   triggerTarget: $(".main"),          // For "imageMouseMove", and "imageHover" only, you can set which element to trigger the image shuffle when mouse over. For example, if you want a container ".main" to trigger an image shuffle instead of the image itself, put $(".main") for this option. Default value is false.
   mouseMoveTrigger: 15,          // For "imageMouseMove" only, you can set how many pixels you have to move in order to trigger one image shuffle. The lower the faster. The default value is 50.
   hoverTrigger: 200,             // For "imageHover" only, you can set how long you have to hover the image until it shuffles to other images. The option accepts milliseconds without unit. The default value is 200.
   scrollTrigger: 50,          // For "documentScroll" only, you can set how many pixels you have to scroll to see the image shuffle. The default value is 100.
   target: "> img"              // In case you have a complete HTML structure, you can set your own custom selector to your images here. The default value is "> img" which means images that are directly under the "shuffle-me" will be used to shuffle.
 });

//mobile
/*$(".shuffle-me-mobile").shuffleImages({
   trigger: "documentScroll",     // Choose which type of trigger you want here. Available options are "imageMouseMove", "imageHover", "documentMouseMove", and "documentScroll". "imageMouseMove" will trigger when your mouse over the image and move your cursor. "imageHover" will trigger when you mouse over without moving your cursor. "documentMouseMove" will trigger when cursor is being moved anywhere on the page. "documentScroll" will trigger when you scroll the page. The default value is "imageMouseMove"
   triggerTarget: false,          // For "imageMouseMove", and "imageHover" only, you can set which element to trigger the image shuffle when mouse over. For example, if you want a container ".main" to trigger an image shuffle instead of the image itself, put $(".main") for this option. Default value is false.
   mouseMoveTrigger: 50,          // For "imageMouseMove" only, you can set how many pixels you have to move in order to trigger one image shuffle. The lower the faster. The default value is 50.
   hoverTrigger: 200,             // For "imageHover" only, you can set how long you have to hover the image until it shuffles to other images. The option accepts milliseconds without unit. The default value is 200.
   scrollTrigger: 50,          // For "documentScroll" only, you can set how many pixels you have to scroll to see the image shuffle. The default value is 100.
   target: "> img"              // In case you have a complete HTML structure, you can set your own custom selector to your images here. The default value is "> img" which means images that are directly under the "shuffle-me" will be used to shuffle.
 });
 */

//follow
var parents = document.querySelectorAll('.container');

var displays;

function onMouseMove( e ) {
    
    // this refers to the caller
    console.log(this)
    
    // Find its child
   var follower = this.querySelector('.follower')
    
    TweenMax.to(follower, 0, {
        x: e.offsetX,
        y: e.offsetY,
        ease:Power4.easeOut
    })
    
    displays.pX.textContent = e.pageX
    displays.pY.textContent = e.pageY
    
    displays.cX.textContent = e.clientX
    displays.cY.textContent = e.clientY
    
    displays.oX.textContent = e.offsetX
    displays.oY.textContent = e.offsetY
    
}


function init() {

    // Listen for mouse movement when over either one of the parents    
    for(var i = 0; i < parents.length; i++){
        parents[i].addEventListener('mousemove', onMouseMove)
    }

};

// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {
    
    // wait until window, stylesheets, images, links, and other media assets are loaded
    window.onload = function() {
        
        displays = {
            pX: document.querySelector('.pageX'),
            pY: document.querySelector('.pageY'),

            cX: document.querySelector('.clientX'),
            cY: document.querySelector('.clientY'),

            oX: document.querySelector('.offsetX'),
            oY: document.querySelector('.offsetY'),
        }
                
        // Center the pivot point of the follower
        TweenMax.set('.follower', {
            xPercent: -50,
            yPercent: -50
        })

        // All ready, start!
        init();

     };

});

TweenMax.set(".container", {visibility: "visible"});

TweenMax.to('.menu', 1.5, {top: 0, opacity: 1, ease: Power3.easeOut,});

TweenMax.staggerFrom('.container', 1.25, {opacity: 0, top: '100vh', delay: 1, ease: Power4.easeOut,}, 0.1);


var tl = new TimelineMax ({
    paused: true,
});

tl.to('.menu-window', .5, {top: 0, scaleY: 1, height: '100vh', ease: Power3.easeOut,});
tl.staggerTo('.menu-item', 1, {opacity: 1, y: 0,}, .1);
/*tl.staggerFrom('.menu-item', 1.5, { top: '100vh', opacity: 0, ease: Power4.easeOut,}, 0.1, '-=.3');*/
tl.staggerFrom('.menu-item-2', 1.5, {top: '100vh', opacity: 0, ease: Power4.easeOut,}, 0.1, '-=1.25');
tl.reversed(true);

$('#menu-button').click(function() {
    $('#button').css("color", "white");
    $('#button').css("border", ".5px solid white");
    $('.project-container').css("display", "none");
    tl.reversed( !tl.reversed());
    if (tl.reversed()){
        tl.reverse();
        $('#button').css("color", "black");
        $('#button').css("border", "1px solid black");
        $('.project-container').css("display", "block");
    }
    else {
        /*
        $('#button').css("color", "white");
        $('#button').css("border", ".5px solid white");
        $('.project-container').css("display", "none");
        */
        tl.play();

    }
    $('.addwhite').toggleClass('white');

});

$('#button').click(function(){
    let tangyEnabled = document.body.classList.toggle('tangy');
    localStorage.setItem('tangy-enabled', tangyEnabled);
});

if (JSON.parse(localStorage.getItem('tangy-enabled'))) {
    document.body.classList.add('tangy');
}

function myFunction(x) {
  x.classList.toggle("change");
}

AOS.init({
    duration: 800,
    offset: -300,
});

