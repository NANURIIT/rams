$(document).ready(function($) {
    /*아코디언*/
    $('.accordion_container').find('.accordion_open').click(function(){
        var acactive = $(this).hasClass("active");
        $(this).removeClass('active')

        if (!acactive) {
            $(this).toggleClass('active');
        }

        $(this).next().slideToggle('fast');

    });
});