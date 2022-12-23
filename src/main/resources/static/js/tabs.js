$(function() {
	
	$('.nav-tabs li').eq(0).addClass('active');
			
    $('.nav-tabs a').click(function() {
        // Check for active
        $('.nav-tabs li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.tab-content .tab-pane').hide();
        $(currentTab).show();

        return false;
    });
});