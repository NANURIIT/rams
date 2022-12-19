$(document).ready(function () {

	setAC01130P();
	setKeyDownFunction();
	findKeydown();
	selectAuthCode();
});


function setAC01130P() {
	let Modal = document.getElementById('AC01130P');
	let OpenModal = document.getElementById("open_modal_AC01130P");
	let CloseModal1 = document.getElementsByClassName("modal_close_AC01130P")[0];

	OpenModal.onclick = function () {
		Modal.style.display = "block";
	}

	CloseModal1.onclick = function () {
		Modal.style.display = "none";
	}
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
		}
	}
}

var runFindUser = function (){
	let empNm = $("#AC01110S_empNm").val();
	let rghtCd = $("#AC01110S_rghtCd option:selected").val();
	let dltY = $('#AC01110S_dltY:checked').length;
	// console.log(rghtCd);
	findUser(empNm, rghtCd, dltY);
}

var findUser= function (empNm, rghtCd, dltY) {
	
	let dtoParam = {
		"empNm" : empNm
		, "rghtCd" : rghtCd
		, "dltY" : dltY
	}

	$.ajax({
		type: "GET",
		url: "/getUserList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01110S_tbodyUserList').html(a);
			rebuildUserManageTable(data);
		}
	});
}

function getUserList() {
	let usrC = $("#usrC").val();					/* 사용자구분 */
	let eno = $("#eno").val();					/* 사번 */
	let empNm = $("#empNm").val();				/* 직원명 */
	let pstn = $("#pstn").val();					/* 직책 */
	let rghtCd = $("#rghtCd").val();				/* 권한 */
	let rgstRsn = $("#rgstRsn").val();			/* 등록사유 */
	let aplcStrtDt = $("#aplcStrtDt").val();		/* 적용시작일 */
	let aplcEndDt = $("#aplcEndDt").val();		/* 회수(예정)일 */
	let rgstPEno = $("#rgstPEno").val();			/* 등록자사번 */
	let hndlPEno = $("#hndlPEno").val();			/* 회수자사번 */

	let dtoParam = {
		"usrC": usrC
		, "eno": eno
		, "empNm": empNm
		, "pstn": pstn
		, "rghtCd": rghtCd
		, "rgstRsn": rgstRsn
		, "aplcStrtDt": aplcStrtDt
		, "aplcEndDt": aplcEndDt
		, "rgstPEno": rgstPEno
		, "hndlPEno": hndlPEno
	}

	$.ajax({
		type: "GET",
		url: "/getUserList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01110S_tbodyUserList').html(a);
			rebuildUserManageTable(data);
		}
	});
}

function rebuildUserManageTable(data) {
	var html = '';
	var userList = data;

	if (userList.length > 0) {
		$.each(userList, function (key, value) {
			//rghtCd = (value.rghtCd == "1") ? "해당부서" : (value.rghtCd == "2") ? "전체" : "해당본부"
				html += '<tr>';
				html += '<td>' + value.usrC + '</td>';
				html += '<td>' + value.eno + '</td>';
				html += '<td>' + value.empNm + '</td>';
				html += '<td>' + value.pstn + '</td>';
				html += '<td>' + value.rghtCd + '</td>';
				html += '<td>' + value.aplcStrtDt + '</td>';
				html += '<td>' + value.aplcEndDt + '</td>';
				html += '<td>' + value.rgstRsn + '</td>';
				html += '<td>' + value.rgstPEno + '</td>';
				html += '<td>' + value.hndlPEno + '</td>';
				html += '</tr>';
		})
	} else {
		html += '<tr>';
		html += '<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	}
	$('#AC01110S_tbodyUserList').html(html);

};

var findKeydown = function(){
	$("input[id=AC01110S_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			// console.log($('#AC01110S_dltY:checked').length);
			runFindUser();
		}
	});
}

/* 사용자관리화면 권한구분 */
var selectAuthCode = function () {
	
	// dtoParam = {
	// 	"rghtCd": rghtCd
	// 	, "rghtCdNm": rghtCdNm
	// 	, "rghtCdExpl": rghtCdExpl
	// 	, "rghtCcd": rghtCcd
	// 	, "aplcF": aplcF
	// 	, "rgstDt": rgstDt
	// 	, "rgstPEno": rgstPEno
	// 	, "dltF": dltF
	// 	, "dltDt": dltDt
	// 	, "dltTm": dltTm
	// 	, "dltPEno": dltPEno
	// 	, "hndlDyTm": hndlDyTm
	// 	, "hndlDprtCd": hndlDprtCd
	// 	, "hndlPEno": hndlPEno
	// }

	$.ajax({
		type: "GET",
		url: "/selectAuthCode",
		// data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01110S_rghtCd').html(a);
			$('#AC01130P_rghtCd').html(a);
			makeRghtCdList(data);
		}
	});
}

/* 권한구분 목록 */
var makeRghtCdList = function(data) {
	var html = '';

		$.each(data, function (key, value) {
			// console.log(value);
			html += '<div>';
			html += '<option value="' + value.rghtCd + '">' + value.rghtCdNm + '</option>';
			html += '<input class="hidden_yn" type="hidden" value="'+ value.rghtCd +'" />';
			html += '</div>';
			// console.log(value.rghtCd);
		})
		// console.log(html);
	$('#AC01110S_rghtCd').html(html);
	$('#AC01130P_rghtCd').html(html);

};