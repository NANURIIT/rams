$(function() {
	$('#ramsTab a:first').tab('show')	
});

$('#ramsTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})