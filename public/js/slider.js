var $j = jQuery.noConflict();
var windowWidth;
var currentSlide;
var numSlides;
var scrollPos;
var top = $j(window).scrollTop();


$j(document).ready(function(){

    currentSlide = 0;
    windowWidth = $j(window).width();
    numSlides = $j('.slide').length;
    
    //on page load, get slide number from url
    //save slide number as currentSlide
    //add slide-selected class to current slide
    $j('.slide').eq(currentSlide).addClass('slide-selected');

    //add functionality
    next();
    previous();

    //set up correct screen sizing
    $j(window).resize(resizeWidth);
    resizeWidth();

    //set up hash change
    $j(window).on('hashchange', getCurrentUrl);
    getCurrentUrl();


    //video functionality
    $j(".video-section").on('click', function(){
        $j(this).children('.video-player').fadeIn(300).css({'z-index': '1000'});
        $j(this).children('video').fadeOut(300);
        $j(this).addClass('hidden');
    });

    setInterval(stickySubNav, 60);

});

 
function stickySubNav() {
    scrollPos = $j(document).scrollTop();
    var windowWidth = $j(window).width();
    

    if (windowWidth > 1060 && scrollPos >= 121) {
        $j('#subheader').css({
            'top': '91'+ 'px'

        });

    } else if (windowWidth <= 1060 && scrollPos > 91) {

        $j('#subheader').css({
            'top': '0'+ 'px'
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
    
    // $j('html, body').scrollTop(0);
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


//move to the next slide
function next() {
    $j('.next-story').on('click', function() {
        var page = $j('.slide').eq(currentSlide+1).attr('data-page');
        window.location.hash = page;
        
        //Scroll to the Top
        // $j('html, body').scrollTop(0);
    });
}


//move to the previous slide
function previous() {
    $j('#nav-previous').on('click', function(){
        var page = $j('.slide').eq(currentSlide-1).attr('data-page');
        window.location.hash = page;
        
        //Scroll to the Top
        // $j('html, body').scrollTop(0);
    });
}


//add selected class to current slide
function currentSlidePage() {

    // updateSlideAd(currentSlide)

    if (currentSlide === -1 && window.location.hash[0] === undefined) {
        var page = $j('.slide').eq(currentSlide+1).attr('data-page');
        window.location.hash = page;
        
    }

    var slidePos = (currentSlide / numSlides) * 100;

    //removed selected class from all slides and circles
    $j('.slide').removeClass('slide-selected');

    $j('.slide').each(function(i) {
        if($j(this).index() === currentSlide) {
            $j(this).addClass('slide-selected');

        }
    });

    //update slide css
    $j('#wrapper-slides').css({
        'transition': 'top 400ms, left 400ms, transform 400ms',
        'transform': 'translate(-' + slidePos + '%, 0%)',
        '-webkit-transition': 'top 400ms, left 400ms, -webkit-transform 400ms',
        '-webkit-transform': '-webkit-translate(-' + slidePos + '%, 0%)',
        '-moz-transition': 'top 400ms, left 400ms, -moz-transform 400ms',
        '-moz-transform': '-moz-translate(-' + slidePos + '%, 0%)',
        '-ms-transition': 'top 400ms, left 400ms, -o-transform 400ms',
        '-ms-transform': 'translate3d(-' + slidePos + '%, 0%)',
        '-o-transition': 'top 400ms, left 400ms, -o-transform 400ms',
        '-o-transform': 'translate3d(-' + slidePos + '%, 0%)
    });
}