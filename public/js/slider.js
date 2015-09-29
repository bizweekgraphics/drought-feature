var $j = jQuery.noConflict();
var windowWidth;
var currentSlide;
var numSlides;
var scrollPos;
var top = $j(window).scrollTop();
var currentSlideImg;
var numSlideImgs;
var numVideos;
var videoPlayerId;
var videoPlayerName;
var videoIds;

$j(document).ready(function(){

    currentSlide = 0;
    windowWidth = $j(window).width();
    numSlides = $j('.slide').length;
    numVideos = $j('#video-wrapper .video-js').length;

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

    //save video ids
    videoIds = [
        {
            id: '5exZYlPaQ5uWXR4zYKHlXA',
            played: false
        },
        {
            id: 'k3UQUgZAQietxJuBcf5A',
            played: false
        },
        {
            id: 'bZtWqfWRKmRuNauoi21Q',
            played: false
        }
    ];

    //set up hash change
    $j(window).on('hashchange', getCurrentUrl);
    getCurrentUrl();

    SafariOnly();

    setInterval(stickySubNav, 60);

    // setInterval(playVideo, 60);

    terminalCalls();

});

 
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



    /*

    page loads
    current slide shows video loop
    user clicks loop, loop hides, corresponding video plays
    navigate to another slide
    pause all videos
    hide all video-player divs
    find new current video-player
    if the new video has not been played before, show loop
    if the new video has been played before, show video

    */



    //pause all videos when changing sections
    for(prop in _V_.players) {
        _V_.players[prop].pause();
    }

    $j('#video-wrapper .video-player').css({
        display: 'none'/*,
        'height' : 0*/
    });

    //if a video has already been played
    if(videoIds[currentSlide-1].played) {
        //show video
        $j('#video-wrapper .video-player').eq(currentSlide-1).css({
            display: 'block'
        });
        //auto play current video
        _V_.players[videoIds[currentSlide-1].id].play();
    }

    //removed selected class from all slides and circles
    $j('.slide').removeClass('slide-selected');
    $j('#subnav a').removeClass('active');

    $j('.slide').each(function(i) {
        if($j(this).index() === currentSlide) {
            $j(this).addClass('slide-selected');
            $j('#subnav a').eq(currentSlide).addClass('active');

        }

        // if($j(this).index() === currentSlide-1) {
            
        // }
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


    // Show icon player
    $j('.video-section').addClass('icon');

    //user on click
    $j(".video-section").on('click', function(){

        // Raise #video-wrapper z-index above the slides and add margin bottom
        $j('#video-wrapper').css({
            'z-index': '10',
            'margin-bottom' : '1.5em'
        });


        // Hide current slide's looping video
        $j('.slide-selected video').css({'display': 'none'});


        // Hide current slide's play button
        $j('.slide-selected video').addClass('hidden');

        playVideo();
    });
    // }
}

function playVideo() {
    // Current scroll position
    scrollPos = $j(document).scrollTop();

    // Video Height
    var videoPadding = $j('.video-section video').height();

    // Finding the video player name
    $j('#video-wrapper .video-js').each(function(i) {

        // If the current video index equals 1 less than the slide's index
        if(i === currentSlide-1) {

            // Current Video Player's #id
            /*videoPlayerId = $j(this).attr('id');
            console.log(videoPlayerId)*/

            // Remove bb-player-video- to acquire the video player number
            videoPlayerName = videoIds[i].id;//videoPlayerId.substring(17);
            videoIds[i].played = true;
            //T The height of this container
            var s = $j(this).height();

            // show this video
            $j('#video-wrapper .video-player').eq(i).css({
                display: 'block'
            });
            $j(this).css({
                display: 'block',
                height : videoPadding + 39 + 'px'
            });

            if (scrollPos <= s) {

                console.log('PLAYINGGG :: my scroll position ' + scrollPos + ' || hieght of this video ' + s);

                _V_.players[videoPlayerName].play();

            } else if (scrollPos > s) {

                console.log('pause');

                _V_.players[videoPlayerName].pause();
            }

        // If the current video index DOES NOT EQUAL 1 less than the slide's index
        }
    });


}




function terminalCalls() {
    if (isTerminal) { 
        $j('a').attr('href', '#');
        $j('.video-player').css({'display': 'none'});
    }
}