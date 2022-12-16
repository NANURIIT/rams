$(document).ready(function () {

	setOpenModal();
	setDatePicker();

	$('#saveButton').on('click', function () {
		var sq = $('#saveButton').val();
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
	let Modal = document.getElementById('AC01120P');
	let OpenModal = document.getElementById("open_modal_AC01120P");
	let CloseModal = document.getElementsByClassName("modal_close_AC01120P")[0];

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

	var empNm = $("#empNmPop").val();
	var eno = $("#eno").val();
	var dprtCd = $("#dprtCd").val();
	var dprtNm = $("#dprtNm").val();

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
			$('#tbodyEmpList').html(a);
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
	$('#tbodyEmpList').html(html);

};

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

// search employee or deal
function keyDownEnter() {

	$("input[id=empNmPop]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			console.log($('#empNm').val());
			getUserList();
		}
	});

	$("input[id=eno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=dprtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=dprtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});
}

// reset AC01120P
function reset_AC01120P() {
	$('#tbodyEmpList').html("");
	$('#empNmPop').val("");
	$('#eno').val("");
	$('#dprtCd').val("");
	$('#dprtNm').val("");
}

// close modal
function modalClose() {
	let Modal = document.getElementById('AC01120P');
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
	$('#setEno').text("");
	$('#empName').val("");
	$('#rghtCd').val("");
	$('#AC01130P_datepicker1').val("");
	$('#AC01130P_datepicker2').val("");
	$('#rgstRsn').val("");
	$('#rgstPEno').text("");
	$('#rgstDt').text("");
	$('#hndlPEno').text("");
	$('#hndlDyTm').text("");
};

let setEno = function (eno) {
	resetTable();
	deleteUser(eno);
	recall();
	updateUser(eno, recallDay);
	$('#setEno').text(eno);
	$('#AC01120P').css('display', 'none');
	
	$.ajax({
		url: '/getUserList',
		method: 'GET',
		dataType: 'json',
	}).done(function (userInfo) {
		for (idx in userInfo) {
			var data = userInfo[idx];
			if (data.eno == eno && data.dltF == 'N') {
				$('#setEno').text(data.eno);
				$('#empName').val(data.empNm);
				$('#rghtCd').val(data.rghtCd);
				$('#AC01130P_datepicker1').val(data.aplcStrtDt.substr(0, 4) + '-' + data.aplcStrtDt.substr(4, 2) + '-' + data.aplcStrtDt.substr(6, 2));
				$('#AC01130P_datepicker2').val(data.aplcEndDt.substr(0, 4) + '-' + data.aplcEndDt.substr(4, 2) + '-' + data.aplcEndDt.substr(6, 2));
				$('#rgstRsn').val(data.rgstRsn);
				$('#rgstPEno').text(data.rgstPEno);
				$('#rgstDt').text(data.rgstDt.substr(0, 4) + '-' + data.rgstDt.substr(4, 2) + '-' + data.rgstDt.substr(6, 2));
				$('#hndlPEno').text(data.hndlPEno);
				$('#hndlDyTm').text(data.hndlDyTm);
				$('#saveButton').val(data.sq);
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

	let eno = $('#setEno').text();
	let empNm = $('#empName').val();
	let rghtCd = $('#rghtCd option:selected').val();
	let aplcStrtDt = $('#AC01130P_datepicker1').val();
	let aplcEndDt = $('#AC01130P_datepicker2').val();
	let rgstRsn = $('#rgstRsn').val();
	let rgstPEno = $('#rgstPEno').val();		/* 등록자는 로그인 한 사원의 세션 */
	let rgstDt = year + month + day;			/* 8자리의 날짜 */
	let hndlPEno = $('#hndlPEno').val();		/* 수정자의 세션 */
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

	$('#deleteUser').on('click', function () {
		$.ajax({
			url: '/deleteUser',
			method: 'PATCH',
			data: JSON.stringify(dtoParam),
			contentType: 'application/json; charset=UTF-8',
			// dataType: 'json',
		});
	});
};

var updateUser = function (eno, recallDay) {
	let dtoParam = {
		"eno": eno
		, "aplcStrtDt": recallDay
	}

	$('#updateUser').on('click', function () {
		$.ajax({
			url: '/updateUser',
			method: 'PATCH',
			data: JSON.stringify(dtoParam),
			contentType: 'application/json; charset=UTF-8',
			// dataType: 'json',
		});
	});
};

var recall = function () {

	$('#recall').on('click', function () {
		$('#AC01130P_datepicker2').val(recallDay);
	})
};
