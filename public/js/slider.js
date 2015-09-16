var $j = jQuery.noConflict();
var windowWidth;
var currentSlide;
var numSlides;
var scrollPos;
var top = $j(window).scrollTop();
var currentSlideImg;
var numSlideImgs;

$j(document).ready(function(){

    currentSlide = 0;
    windowWidth = $j(window).width();
    numSlides = $j('.slide').length;

    currentSlideImg = 0;
    numSlideImgs = $j('.slide-selected .slide_img').length;
    
    //on page load, get slide number from url
    //save slide number as currentSlide
    //add slide-selected class to current slide
    $j('.slide').eq(currentSlide).addClass('slide-selected');
    $j('.slide-selected .slide_img').eq(currentSlide).addClass('slide-show');

    //add functionality
    // arrows();
    next();
    previous();

    //set up correct screen sizing
    $j(window).resize(resizeWidth);
    resizeWidth();

    //set up hash change
    $j(window).on('hashchange', getCurrentUrl);
    getCurrentUrl();

    SafariOnly();

    //video functionality
    // $j(".video-section").on('click', function(){
    //     $j(this).children('.video-player').fadeIn(300);
    //     $j(this).children('video').fadeOut(300);
    //     $j(this).addClass('hidden');
    // });

    setInterval(onUserScroll, 60);

});

// function videoClick() {
//     $j(".video-section").children('.video-player').fadeIn(300);
//     $j(".video-section").children('video').fadeOut(300);
//     $j(".video-section").addClass('hidden');
// }

function onUserScroll() {
    scrollPos = $j(document).scrollTop();

    // Parallax starts after .body-copy
    var limit = $j('#slide-one > .body-copy').height();
    limit+=$j('#slide-one > .body-copy').offset().top;
    limit+=30;


    // Check if the scroll position is more than body copy plus window height
    if (scrollPos > limit) {

    }

    stickySubNav();
    
}

 
function stickySubNav() {
    scrollPos = $j(document).scrollTop();
    var windowWidth = $j(window).width();
    

    if (windowWidth <= 1160 && scrollPos > 91) {
        $j('#subheader').css({
            'top': '0'+ 'px'

        });

    } else if (windowWidth > 768 && scrollPos >= 121) {

        $j('#subheader').css({
            'top': '91'+ 'px'
        });

    } else if (windowWidth > 768 && scrollPos < 121) {

        $j('#subheader').css({
            'top': '121'+ 'px'
        });

    } else if (windowWidth <= 768 && scrollPos < 91)  {
        $j('#subheader').css({
            'top': '91'+ 'px'
        });
    }

}



function getCurrentUrl() {
    var page = String(window.location.hash).substring(1);
    currentSlide = $j('.slide[data-page="'+page+'"]').index();
    currentSlidePage();
    
    $j('html, body').scrollTop(0);
}


//on page resize, 
function resizeWidth() {
    windowWidth = $j(window).width();
    
    $j('#wrapper-slides').width(numSlides * windowWidth);
    $j('.slide').width(windowWidth);

    $j('.slide').each(function(i) {
        $j(this).css('left', (i * windowWidth) + 'px');
    });
}


//update arrow display based on current slide
function arrows() {

    if(currentSlide===(numSlides-1)) {
        $j('#nav-next').css('display', 'none');
        $j('#nav-previous').css('display', 'block');
    } else if (currentSlide === 0){
        $j('#nav-next').css('display', 'block');
        $j('#nav-previous').css('display', 'none');
    } else if (currentSlide > 0 && currentSlide < (numSlides-1)) {
        $j('#nav-next').css('display', 'block');
        $j('#nav-previous').css('display', 'block');

    }
}


//move to the next slide
function next() {
    $j('#nav-next').on('click', function() {
        var page = $j('.slide').eq(currentSlide+1).attr('data-page');
        window.location.hash = page;
        
        //Scroll to the Top
        $j('html, body').scrollTop(0);
    });
}


//move to the previous slide
function previous() {
    $j('#nav-previous').on('click', function(){
        var page = $j('.slide').eq(currentSlide-1).attr('data-page');
        window.location.hash = page;
        
        //Scroll to the Top
        $j('html, body').scrollTop(0);
    });
}


//add selected class to current slide
function currentSlidePage() {

    // updateSlideAd(currentSlide)

    if (currentSlide === -1 && window.location.hash[0] === undefined) {
        var page = $j('.slide').eq(currentSlide+1).attr('data-page');
        window.location.hash = page;
        
    } else {
        arrows();
        
    }

    var slidePos = (currentSlide / numSlides) * 100;

    //removed selected class from all slides and circles
    $j('.slide').removeClass('slide-selected');
    // $j('#subnav a').removeClass('active');

    $j('.slide').each(function(i) {
        if($j(this).index() === currentSlide) {
            $j(this).addClass('slide-selected');

        }

        if($j(this).index() === currentSlide-1) {
            // $j('#subnav a').eq(currentSlide-1).addClass('active');

        }
    });

    //update slide css
    $j('#wrapper-slides').css({
        'transition': 'top 400ms, left 400ms, transform 400ms',
        'transform': 'translate3d(-' + slidePos + '%, 0%, 0px) scale3d(1, 1, 1)',
        '-webkit-transition': 'top 400ms, left 400ms, -webkit-transform 400ms',
        '-webkit-transform': '-webkit-translate3d(-' + slidePos + '%, 0%, 0px) scale3d(1, 1, 1)',
        '-moz-transition': 'top 400ms, left 400ms, -moz-transform 400ms',
        '-moz-transform': '-moz-translate3d(-' + slidePos + '%, 0%, 0px) scale3d(1, 1, 1)',
        '-ms-transition': 'top 400ms, left 400ms, -o-transform 400ms',
        '-ms-transform': 'translate3d(-' + slidePos + '%, 0%, 0px) scale3d(1, 1, 1)',
        '-o-transition': 'top 400ms, left 400ms, -o-transform 400ms',
        '-o-transform': 'translate3d(-' + slidePos + '%, 0%, 0px) scale3d(1, 1, 1)'
    });
}


function scrollToTop() {
        $j('html, body').animate({scrollTop: 0}, '500', 'easein');
}


function SafariOnly() {
    var uagent = navigator.userAgent.toLowerCase();
    if(/safari/.test(uagent) && !/chrome/.test(uagent))
    {
        // window.location.href = "elsewhere.html"

         console.log(" safari whaaat ?? " + uagent );



        $j(".video-section").off('click', function(){

            console.log("safari clicking");

            $j(this).children('.video-player').fadeIn(300);
            $j(this).children('video').fadeOut(300);
            $j(this).addClass('hidden');
        });

        if(navigator.userAgent.match(/(iPhone|iPod)/i)) {

            $j('.safari-fix').css({'display': 'block'});
            $j('.video-section::after').css({'content': ''});

        } else (navigator.userAgent.match(/(iPad)/i)){

            console.log(" HELP ?? " + uagent );

            // $j('.video-section .video-player').css({'display': 'none'});
            $j('.safari-fix').css({'display': 'block'});
            $j('#main .video-section::after').css({'content': ''});

        }


    } else {
        

        $j(".video-section").on('click', function(){

            console.log("ELSE ?! " + uagent);

             $j(this).children('.video-player').fadeIn(300);
             $j(this).children('video').fadeOut(300);
             $j(this).addClass('hidden');
        });
    }
}