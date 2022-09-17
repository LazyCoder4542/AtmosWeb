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

});