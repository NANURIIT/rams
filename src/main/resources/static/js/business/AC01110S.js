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
		resetTable();
	}
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
			resetTable();
		}
	}
}

var runFindUser = function () {
	let empNm = $("#AC01110S_empNm").val();
	let rghtCd = $("#AC01110S_rghtCd option:selected").val();
	let dltY = $('#AC01110S_dltY:checked').length;
	// console.log(rghtCd);
	findUser(empNm, rghtCd, dltY);
}

var findUser = function (empNm, rghtCd, dltY) {

	let dtoParam = {
		"empNm": empNm
		, "rghtCd": rghtCd
		, "dltY": dltY
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
	let eno = $("#eno").val();						/* 사번 */
	let empNm = $("#empNm").val();					/* 직원명 */
	let pstn = $("#pstn").val();					/* 직책 */
	let rghtCd = $("#rghtCd").val();				/* 권한 */
	let rgstRsn = $("#rgstRsn").val();				/* 등록사유 */
	let aplcStrtDt = $("#aplcStrtDt").val();		/* 적용시작일 */
	let aplcEndDt = $("#aplcEndDt").val();			/* 회수(예정)일 */
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
			html += '<tr class="rght_user" ondblclick="selectRgthUser(this);">';		// 해당 데이터가 가진 sequence 값
			html += '<td>' + value.usrC + '</td>';
			html += '<td value="' + value.sq + '" >' + value.eno + '</td>';
			html += '<td>' + value.empNm + '</td>';
			html += '<td>' + value.pstn + '</td>';
			html += '<td class="rght_cd_nm">' + value.rghtCdNm + '</td>';
			html += '<td>' + value.aplcStrtDt + '</td>';
			html += '<td>' + value.aplcEndDt + '</td>';
			html += '<td>' + value.rgstRsn + '</td>';
			html += '<td>' + value.rgstPEno + '</td>';
			html += '<td>' + value.hndlPEno + '</td>';
			html += '<input type="hidden" value="' + value.sq + '" />'
			html += '</tr>';
		})
	} else {
		html += '<tr>';
		html += '<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	}
	$('#AC01110S_tbodyUserList').html(html);

};

var findKeydown = function () {
	$("input[id=AC01110S_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			// console.log($('#AC01110S_dltY:checked').length);
			runFindUser();
		}
	});
}

/* 사용자관리화면 권한구분 */
var selectAuthCode = function () {

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
var makeRghtCdList = function (data) {
	var html = '<div><option value="">전체</option></div>';

	$.each(data, function (key, value) {
		html += '<div>';
		html += '<option value="' + value.rghtCd + '">' + value.rghtCdNm + '</option>';
		html += '</div>';
	})
	$('#AC01110S_rghtCd').html(html);
	$('#AC01130P_rghtCd').html(html);

};

/* AC01130P 팝업 오픈 */
function openModal() {
	let Modal = document.getElementById('AC01130P');
	Modal.style.display = "block";
}

// 사용자 조회 (더블 클릭 및 사용자 추가에서 사용)
function selectRgthUser(e) {
	openModal();
	var sq = $(e).find('input').val();
	var eno = $(e).find('td:eq(1)').html();
	// console.log("sq : " + sq + ", eno : " + eno);
	selectAuthUser(sq, eno);

}

var selectAuthUser = function (sq, eno) {
	let dtoParam = {
		"sq": sq
		, "eno": eno
	}

	$.ajax({
		url: "/getUserList",
		data: dtoParam,
		// dataType: "json",
		success: function (userInfo) {
			addAuth(userInfo);
		},
	})
}

var addAuth = function (userInfo) {
	for (idx in userInfo) {
		var data = userInfo[idx];
		$('#AC01130P_setEno').val(data.eno);
		$('#AC01130P_empNm').val(data.empNm);
		$('#AC01130P_rghtCd').val(data.rghtCd);
		$('#AC01130P_datepicker1').val(data.aplcStrtDt.substr(0, 4) + '-' + data.aplcStrtDt.substr(4, 2) + '-' + data.aplcStrtDt.substr(6, 2));
		$('#AC01130P_datepicker2').val(data.aplcEndDt.substr(0, 4) + '-' + data.aplcEndDt.substr(4, 2) + '-' + data.aplcEndDt.substr(6, 2));
		$('#AC01130P_rgstRsn').val(data.rgstRsn);
		$('#AC01130P_rgstPEno').text(data.rgstPEno);
		$('#AC01130P_rgstDt').text(data.rgstDt.substr(0, 4) + '-' + data.rgstDt.substr(4, 2) + '-' + data.rgstDt.substr(6, 2));
		$('#AC01130P_hndlPEno').text(data.hndlPEno);
		$('#AC01130P_hndlDyTm').text(data.hndlDyTm);
		$('#AC01130P_sq').val(data.sq);
	};
};