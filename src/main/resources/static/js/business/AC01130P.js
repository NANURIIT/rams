$(document).ready(function () {

	setOpenModal();
	setDatePicker();

	// setAAAA();

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
	$('.datepicker').on('apply.daterangepicker', function (ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
	});

	// btn clear
	$('.datepicker').on('cancel.daterangepicker', function (ev, picker) {
		$(this).val('');
	});

}

// modal controll function
function setOpenModal() {
	let Modal = document.getElementById('AC01121P');
	let OpenModal = document.getElementById("open_modal_AC01121P");
	let CloseModal = document.getElementsByClassName("modal_close_AC01121P")[0];

	// open modal
	OpenModal.onclick = function () {
		Modal.style.display = "block";
		
	}

	// close modal
	CloseModal.onclick = function () {
		Modal.style.display = "none";
		reset_AC01121P();
	}

	// close modal
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
			reset_AC01121P();
		}
	}

	// close modal
	$(document).keydown(function (e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
			reset_AC01121P();
		}

	});

}

// get employee list
function getEmpList() {

	var empNm = $("#AC01121P_empNm").val();
	var eno = $("#AC01121P_eno").val();
	var dprtNm = $("#AC01121P_dprtNm").val();
	var dprtCd = $("#AC01121P_dprtCd").val();

	var dtoParam = {
		"empNm": empNm
		, "eno": eno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01121P_tbodyEmpList').html(a);
			rebuildTable(data);
		}
	});

}

// draw modal table employee 
function rebuildTable(data) {
	var html = '';
	var empList = data;

	if (empList.length > 0) {
		$.each(empList, function (key, value) {
			html += '<tr onclick="setEno(' + "'" + value.ENO + "', '" + value.EMP_NM + "'" + ');">';
			html += '<td>' + value.ENO + '</td>';
			html += '<td>' + value.EMP_NM + '</td>';
			html += '<td>' + value.DPRT_CD + '</td>';
			html += '<td>' + value.DPRT_NM + '</td>';
			html += '<td>' + value.HDQT_CD + '</td>';
			html += '<td>' + value.HDQT_NM + '</td>';
			html += '</tr>';
		})
	} else {
		html += '<tr>';
		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	}
	$('#AC01121P_tbodyEmpList').html(html);

};

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

// search employee or deal
function keyDownEnter() {

	$("input[id=AC01121P_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01121P_eno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01121P_dprtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01121P_dprtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});
}

// reset AC01121P
function reset_AC01121P() {
	$('#AC01121P_tbodyEmpList').html("");
	$('#AC01121P_empNm').val("");
	$('#AC01121P_eno').val("");
	$('#AC01121P_dprtCd').val("");
	$('#AC01121P_dprtNm').val("");
}

// close modal
function modalClose() {
	let Modal = document.getElementById('AC01121P');
	Modal.style.display = "none";
	reset_AC01121P();
}

// close AC01130P modal
function modalClose_AC01130P() {
	let Modal = document.getElementById('AC01130P');
	Modal.style.display = "none";
}

// AC01130P 팝업 페이지 초기화
var resetTable = function () {
	$('#AC01130P_setEno').val("");
	$('#AC01130P_empNm').val("");
	// $('#AC01130P_rghtCd').val("");
	$('#AC01130P_datepicker1').val("");
	$('#AC01130P_datepicker2').val("");
	$('#AC01130P_rgstRsn').val("");
	$('#AC01130P_rgstPEno').text("");
	$('#AC01130P_rgstDt').text("");
	$('#AC01130P_hndlPEno').text("");
	$('#AC01130P_hndlDyTm').text("");
};

// 오늘의 날짜
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var recallDay = year + "-" + month + "-" + day;

// 사용자 조회 (더블 클릭 및 사용자 추가에서 사용)
let setEno = function (eno, empNm) {
	resetTable();
	$('#AC01130P_setEno').val(eno);
	$('#AC01130P_empNm').val(empNm);
	$('#AC01130P_datepicker1').val(recallDay);
	modalClose();
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

// 권한 회수
var recall = function () {
	$('#AC01130P_datepicker2').val(recallDay);
};


/* 쿼리 실행 시 페이지 리로드 */
var reload = function (empNm) {
	// let emp = $('#AC01130P_empNm').val();
	let rghtCd = $("#AC01130P_rghtCd option:selected").val();
	let dltY = "0";
	console.log(empNm +", "+ rghtCd +", "+ dltY)
	findUser(empNm, rghtCd, dltY);
}