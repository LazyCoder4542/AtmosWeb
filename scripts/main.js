$(document.body).children().css({ display: 'none' });
$('html, body').addClass('scroll-paused')
$(window).on('load', function () {
    console.log('Window Loaded');
    $('html, body').removeClass('scroll-paused')
    setTimeout(() => {
        $('#loading-screen').hide()
        //document.body.removeEventListener('touchmove', scrollDisabled, { passive: false });
    }, 4000);
});
$(document).ready(function () {
    $(document.body).children().css({ display: '' });
    console.log('ready')
    $('.slide-menu .hamburger').click(function (e) {
        $(this).parent().toggleClass('open')
    });
    var switchs = $('.convert-temp .switch');
    if ($(switchs).get(0).ariaCurrent == 'kelvin') {
        $(switchs).addClass('right')
    }
    else {
        $(switchs).get(0).ariaCurrent = 'celsius'
        $(switchs).addClass('left')
    }
    $(switchs).click(function (e) {
        if ($(switchs).get(0).ariaCurrent == 'kelvin') {
            $(switchs).get(0).ariaCurrent = 'celsius'
            $(switchs).addClass('left')
            $(switchs).removeClass('right')
        }
        else if ($(switchs).get(0).ariaCurrent == 'celsius') {
            $(switchs).get(0).ariaCurrent = 'kelvin'
            $(switchs).addClass('right')
            $(switchs).removeClass('left')
        }

    });

});