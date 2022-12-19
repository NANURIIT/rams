$(document).ready(function() {

	setDatePicker();

	setOpenModal();

	setKeyDownFunction();

	setTabContents();

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

// modal controll function
function setOpenModal() {
	let Modal = document.getElementById('AS02020P');
	let OpenModal = document.getElementById("open_modal_AS02020P");
	let CloseModal = document.getElementsByClassName("modal_close_AS02020P")[0];

	// open modal
	OpenModal.onclick = function() {
		Modal.style.display = "block";
	}

	// close modal
	CloseModal.onclick = function() {
		Modal.style.display = "none";
	}

	// close modal
	window.onclick = function(event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
		}
	}

	// close modal
	$(document).keydown(function(e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
		}

	});
}

function setKeyDownFunction() {
	keyDownEnter();
}

function keyDownEnter() {

	$("input[id=AS02020P_dealNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

	$("input[id=AS02020P_dealNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

}

function getDealInfo() {

	var dealNo = $("#AS02020P_dealNo").val();
	var dealNm = $("#AS02020P_dealNm").val();
	var dscDate = $("#AS02020P_datepicker1").val();

	var dtoParam = {
		"dealNo": dealNo
		, "dealNm": dealNm
		, "dscDate": dscDate
	}

	//console.log(dtoParam);

	$.ajax({
		type: "GET",
		url: "/getDealInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {

			//console.log(data);
			/* 
			var a = '';
			$('#tbodyEmpList').html(a);
			
			rebuildTable(data);
			 */

		}
	});

}

function setDealInfo() {
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	var tr = event.currentTarget;
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();

	//console.log(ibDealNo);
}

function setTabContents() {
	setTab1();
}

// 탭1 안건구조
function setTab1() {
	setInspctDprtCcd();
	setInvstGdsLdvdCd();
	setInvstGdsMdvdCd();
	setInvstGdsSdvdCd();
}

// 심사부서구분코드
function setInspctDprtCcd() {
	$.ajax({
		type: "GET",
		url: "/getInspctDprtCcd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_inspctDprtCcd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_inspctDprtCcd').html(html);
		}
	});
}

// 투자상품대분류코드
function setInvstGdsLdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsLdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsLdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsLdvdCd').html(html);
		}
	});
}

// 투자상품중분류코드
function setInvstGdsMdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsMdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsMdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsMdvdCd').html(html);
		}
	});
}

// 투자상품소분류코드
function setInvstGdsSdvdCd() {
	$.ajax({
		type: "GET",
		url: "/getInvstGdsSdvdCd",
		dataType: "json",
		success: function(data) {
			var html = "";
			$('#AS03210S_invstGdsSdvdCd').html(html);

			var codeList = data;
			if (codeList.length > 0) {
				$.each(codeList, function(key, value) {
					html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
				});
			}
			$('#AS03210S_invstGdsSdvdCd').html(html);
		}
	});
}



