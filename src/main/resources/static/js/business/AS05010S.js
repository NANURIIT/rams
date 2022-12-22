$(document).ready(function() {
	
	setDatePicker();
	
});

function setDatePicker() {

	// settings
	$('.datepicker').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		autoApply: false,
		locale: {
			"cancelLabel": 'Clear',
			"format": 'YYYY-MM-DD',
			"daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
			"monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
		}
	});

	// btn apply
	$('.datepicker').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
	});

	// btn clear
	$('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});

}

