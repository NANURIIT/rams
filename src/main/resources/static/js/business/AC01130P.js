$(document).ready(function () {

	setOpenModal();
	setDatePicker();

	$('#AC01130P_saveButton').on('click', function () {
		var sq = $('#AC01130P_saveButton').val();
		console.log("button: " + sq);
		saveUserData(sq);
	});

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
		reset_AC01120P();
	}

	// close modal
	CloseModal.onclick = function () {
		Modal.style.display = "none";
	}

	// close modal
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
		}
	}

	// close modal
	$(document).keydown(function (e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
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

	//console.log(data);

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01121P_tbodyEmpList').html(a);
			//console.log(data);
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
			//console.log(value);
			html += '<tr onclick="setEno(' + "'" + value.ENO + "'" + ');">';
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
	//console.log(html);
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

	$("input[id=AC01110S_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			runFindUser();
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
}

// // send to #rcvdEmpNm
// function setEmpNm(){
// 	var tr = event.currentTarget;
// 	var td = $(tr).children();
// 	var empNm = td.eq(1).text();

// 	$('#rcvdEmpNm').val(empNm);
// 	modalClose();
// }

var resetTable = function () {
	$('#AC01130P_setEno').text("");
	$('#AC01130P_empName').val("");
	$('#AC01130P_rghtCd').val("");
	$('#AC01130P_datepicker1').val("");
	$('#AC01130P_datepicker2').val("");
	$('#AC01130P_rgstRsn').val("");
	$('#AC01130P_rgstPEno').text("");
	$('#AC01130P_rgstDt').text("");
	$('#AC01130P_hndlPEno').text("");
	$('#AC01130P_hndlDyTm').text("");
};

let setEno = function (eno) {
	resetTable();
	deleteUser(eno);
	recall();
	updateUser(eno, recallDay);
	$('#AC01130P_setEno').text(eno);
	$('#AC01121P').css('display', 'none');
	
	$.ajax({
		url: '/getUserList',
		method: 'GET',
		dataType: 'json',
	}).done(function (userInfo) {
		for (idx in userInfo) {
			var data = userInfo[idx];
			if (data.eno == eno && data.dltF == 'N') {
				$('#AC01130P_setEno').text(data.eno);
				$('#AC01130P_empName').val(data.empNm);
				$('#AC01130P_rghtCd').val(data.rghtCd);
				$('#AC01130P_datepicker1').val(data.aplcStrtDt.substr(0, 4) + '-' + data.aplcStrtDt.substr(4, 2) + '-' + data.aplcStrtDt.substr(6, 2));
				$('#AC01130P_datepicker2').val(data.aplcEndDt.substr(0, 4) + '-' + data.aplcEndDt.substr(4, 2) + '-' + data.aplcEndDt.substr(6, 2));
				$('#AC01130P_rgstRsn').val(data.rgstRsn);
				$('#AC01130P_rgstPEno').text(data.rgstPEno);
				$('#AC01130P_rgstDt').text(data.rgstDt.substr(0, 4) + '-' + data.rgstDt.substr(4, 2) + '-' + data.rgstDt.substr(6, 2));
				$('#AC01130P_hndlPEno').text(data.hndlPEno);
				$('#AC01130P_hndlDyTm').text(data.hndlDyTm);
				$('#AC01130P_saveButton').val(data.sq);
				break;
			};
		};
	});
}

var getEnoList = function () {

	/* 사원번호 조회 선택 후 AC01130P 해당 항목에 입력 */
	$.ajax({
		url: '/getEnoList',
		method: 'GET',
		dataType: 'json',
		// data: dtoParam,
	}).done(function (userInfo) {
		let userInfoHTML = '';
		for (idx in userInfo) {
			let row = userInfo[idx];
			//console.log(stringEno);
			userInfoHTML += '<tr><td>' + row.eno + '<button onclick="setEno(' + "'" + row.eno + "','" + row.sq + "'" + ');">선택</button></td><td>' + row.empNm + '</td></tr>';
		}
		$('#userInfo').html(userInfoHTML);
	});
}

// 오늘의 날짜
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var recallDay = year + "-" + month + "-" + day;

var saveUserData = function (param) {

	let eno = $('#AC01130P_setEno').text();
	let empNm = $('#AC01130P_empName').val();
	let rghtCd = $('#AC01130P_rghtCd option:selected').val();
	let aplcStrtDt = $('#AC01130P_datepicker1').val();
	let aplcEndDt = $('#AC01130P_datepicker2').val();
	let rgstRsn = $('#AC01130P_rgstRsn').val();
	let rgstPEno = $('#AC01130P_rgstPEno').val();		/* 등록자는 로그인 한 사원의 세션 */
	let rgstDt = year + month + day;			/* 8자리의 날짜 */
	let hndlPEno = $('#AC01130P_hndlPEno').val();		/* 수정자의 세션 */
	let hndlDyTm = today; 						/* 수정한 시간(Date타입) */
	let sq = Number(param);

	let dtoParam = {
		"eno": eno
		, "empNm": empNm
		, "rghtCd": rghtCd
		, "dprtCd": ""
		, "rgstRsn": rgstRsn
		, "aplcStrtDt": aplcStrtDt
		, "aplcEndDt": aplcEndDt
		, "rgstPEno": rgstPEno
		, "rgstDt": rgstDt
		, "hndlPEno": hndlPEno
		, "hndlDyTm": hndlDyTm
		, "dltF": ""
		, "dltDt": ""
		, "dltTm": ""
		, "dltPEno": ""
		, "rgstTm": ""
		, "hndlDprtCd": ""
		, "sq": sq
	}

	$.ajax({
		method: 'POST',
		url: '/insertUser',
		data: JSON.stringify(dtoParam),
		contentType: "application/json; charset=UTF-8",
		// dataType: 'json',
		success: function (response) {
			alert(response);
		},
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

var deleteUser = function (eno) {
	let dtoParam = {
		"eno": eno
	}

	$('#AC01130P_deleteUser').on('click', function () {
		$.ajax({
			url: '/deleteUser',
			method: 'PATCH',
			data: JSON.stringify(dtoParam),
			contentType: 'application/json; charset=UTF-8',
			// dataType: 'json',
		});
	});
};

var recall = function () {

	$('#AC01130P_recall').on('click', function () {
		$('#AC01130P_datepicker2').val(recallDay);
	})
};
