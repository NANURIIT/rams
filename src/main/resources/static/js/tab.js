$(function() {
	
    $('.tabs-nav a').click(function() {

        // Check for active
        $('.tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.tabs-content .tab').hide();
        $(currentTab).show();

        return false;
    });
});