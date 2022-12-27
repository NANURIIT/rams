$(document).ready(function () {

	setAC01130P();

	setDatePicker();
	
	openModalAC01120P();
	
});

// 오늘의 날짜
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var recallDay = year + "-" + month + "-" + day;


function setAC01130P() {
	let Modal = document.getElementById('AC01130P');
	let OpenModal = document.getElementById("open_modal_AC01130P");
	let CloseModal1 = document.getElementsByClassName("modal_close_AC01130P")[0];

	OpenModal.onclick = function () {
		Modal.style.display = "block";
		resetTable();
	}
	
	CloseModal1.onclick = function () {
		Modal.style.display = "none";
		resetTable();
	}
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
			resetTable();
		}
	}
}

// AC01130P 팝업 페이지 초기화
var resetTable = function () {
	$('#AC01110S_empNo').val("");
	$('#AC01110S_empNm').val("");
	$('#AC01130P_rghtCd').val("").prop('selected, true');
	$('#AC01130P_datepicker1').val("");
	$('#AC01130P_datepicker2').val("");
	$('#AC01130P_rgstRsn').val("");
	$('#AC01130P_rgstPEno').text("");
	$('#AC01130P_rgstDt').text("");
	$('#AC01130P_hndlPEno').text("");
	$('#AC01130P_hndlDyTm').text("");
};

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
	$('.datepicker').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
	});

	// btn clear
	$('.datepicker').on('cancel.daterangepicker', function (ev, picker) {
		$(this).val('');
	});

}

function openModalAC01120P(){
	$('#open_modal_AC01120P').click(function(){
		resetTable();
	});
}

// 권한 저장
var saveUserData = function () {
	let eno = $('#AC01130P_setEno').val();
	let empNm = $('#AC01130P_empNm').val();
	let rghtCd = $('#AC01130P_rghtCd option:selected').val();
	let aplcStrtDt = $('#AC01130P_datepicker1').val();
	let aplcEndDt = $('#AC01130P_datepicker2').val();
	let rgstRsn = $('#AC01130P_rgstRsn').val();
	let rgstPEno = $('#AC01130P_rgstPEno').val();		/* 등록자는 로그인 한 사원의 세션 */
	let rgstDt = year + month + day;					/* 8자리의 날짜 */
	let hndlPEno = $('#AC01130P_hndlPEno').val();		/* 수정자의 세션 */
	let hndlDyTm = today; 								/* 수정한 시간(Date타입) */
	let sq = $('#AC01130P_sq').val();
	let dltF = 'N';

	let dtoParam = {
		"eno": eno
		, "empNm": empNm
		, "rghtCd": rghtCd
		, "rgstRsn": rgstRsn
		, "aplcStrtDt": aplcStrtDt
		, "aplcEndDt": aplcEndDt
		, "rgstPEno": rgstPEno
		, "rgstDt": rgstDt
		, "hndlPEno": hndlPEno
		, "hndlDyTm": hndlDyTm
		, "dltF": dltF
		, "sq": sq
	}

	$.ajax({
		method: 'POST',
		url: '/insertUser',
		data: JSON.stringify(dtoParam),
		contentType: "application/json; charset=UTF-8",
		// dataType: 'json',
		success: function (response) {
			// alert(response);
			resetTable();
			modalClose_AC01130P();
			reload(empNm);
		},
		error: function (request, status, error) {
			console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

// close AC01130P modal
function modalClose_AC01130P() {
	let Modal = document.getElementById('AC01130P');
	Modal.style.display = "none";
}


// 사용자 삭제(사원 퇴사)
var deleteUser = function () {

	let eno = $('#AC01130P_setEno').val();
	let sq = $('#AC01130P_sq').val();
	// console.log("eno : " + eno + " sq : " + sq);
	var param = {
		"eno": eno
		, "sq": sq
		, "dltF": "Y"
		, "dltPEno": ""
		, "dltDt": ""
		, "dltTm": ""
	}

	$.ajax({
		url: '/deleteUser',
		data: param,
		method: 'PATCH',
		data: JSON.stringify(param),
		contentType: 'application/json; charset=UTF-8',
		// dataType: 'json',
		success: function () {
			resetTable();
			modalClose_AC01130P();
			reload(eno);
		},

	});
};

/* 쿼리 실행 시 페이지 리로드 */
var reload = function (empNm) {
	// let emp = $('#AC01130P_empNm').val();
	let rghtCd = $("#AC01130P_rghtCd option:selected").val();
	let dltY = "0";
	//console.log(empNm +", "+ rghtCd +", "+ dltY)
	findUser(empNm, rghtCd, dltY);
}

// 권한 회수
var recall = function () {
	$('#AC01130P_datepicker2').val(recallDay);
};