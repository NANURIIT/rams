$(document).ready(function () {
	// Enter key event
	findKeydown();
	// 페이지 로딩 시 권한구분의 <select> 데이터로 RAA94B.RGHT_CD_NM을 가져온다.
	selectAuthCode();
});

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 조회 버튼 클릭 이벤트
 */
var runFindUser = function () {
	let empNm = $("#empNm").val();
	let rghtCd = $("#AC01110S_rghtCd option:selected").val();
	let dltY = $('#AC01110S_dltY:checked').length;
	findUser(empNm, rghtCd, dltY);
}
/**
 * 사용자조회 ajax 호출
 * @param {String} empNm 검색어 - 직원명(사번)
 * @param {String} rghtCd <select> 권한구분
 * @param {int} dltY 과거이력포함(1), 미포함(0, default)
 */
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


/**
 * 사용자목록
 * @param {JSON} data Ajax(/getUserList) response 데이터
 */
function rebuildUserManageTable(data) {
	var html = '';
	var userList = data;

	if (userList.length > 0) {
		$.each(userList, function (key, value) {
			html += '<tr class="rght_user" ondblclick="selectRgthUser(this);">';		// 해당 데이터가 가진 sequence 값
			html += '    <td>' + value.usrC + '</td>';
			html += '    <td value="' + value.sq + '" >' + value.eno + '</td>';
			html += '    <td>' + value.empNm + '</td>';
			html += '    <td>' + value.pstn + '</td>';
			html += '    <td class="rght_cd_nm">' + value.rghtCdNm + '</td>';
			html += '    <td>' + value.aplcStrtDt.substr(0, 4) + '-' + value.aplcStrtDt.substr(4, 2) + '-' + value.aplcStrtDt.substr(6, 2) + '</td>';
			html += '    <td>' + value.aplcEndDt.substr(0, 4) + '-' + value.aplcEndDt.substr(4, 2) + '-' + value.aplcEndDt.substr(6, 2) + '</td>';
			// html += '    <td>' + value.aplcStrtDt + '</td>';
			// html += '    <td>' + value.aplcEndDt + '</td>';
			html += '    <td>' + value.rgstRsn + '</td>';
			html += '    <td>' + value.rgstPEno + '</td>';
			html += '    <td>' + value.hndlPEno + '</td>';
			html += '    <input type="hidden" value="' + value.sq + '" />'
			html += '</tr>';
		})
	} else {
		html += '<tr>';
		html += '    <td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	}
	$('#AC01110S_tbodyUserList').html(html);

};

/**
 * Enter key event
 */
var findKeydown = function () {
	$("input[id=empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			runFindUser();
		}
	});
}

/**
 * 권한구분 코드 ajax호출
 */
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

/**
 * 권한구분 목록 
 * @param {JSON} data Ajax(/selectAuthCode) response 데이터
 */
var makeRghtCdList = function (data) {
	var html = '<div><option value="">전체</option></div>';		// value가 null인 데이터로 조회하면 전체 데이터가 나와야한다.

	$.each(data, function (key, value) {
		html += '<div>';
		html += '    <option value="' + value.rghtCd + '">' + value.rghtCdNm + '</option>';
		html += '</div>';
	})
	$('#AC01110S_rghtCd').html(html);
	$('#AC01130P_rghtCd').html(html);

};

/*******************************************************************
 *** 사용자추가 팝업 event
 *******************************************************************/
/**
 * [AC01130P] 사용자추가 팝업 오픈 
 */
function openModal() {
	$('#modal-AC01130P').modal('show');
}

/**
 * 사용자 조회 (더블 클릭 및 사용자 추가에서 사용)
 * @param {this} e 더블 클릭 이벤트가 실행된 <tr>
 */
function selectRgthUser(e) {
	openModal();
	var sq = $(e).find('input').val();
	var eno = $(e).find('td:eq(1)').html();
	selectAuthUser(sq, eno);
}

/**
 * 사용자 조회 ajax (더블 클릭 및 사용자 추가에서 사용)
 * @param {String} sq 수정할 권한의 SQ
 * @param {String} eno 수정할 권한의 사원번호
 */
var selectAuthUser = function (sq, eno) {
	let dtoParam = {
		"sq": sq
		,"eno": eno
	}

	$.ajax({
		url: "/getUserList",
		data: dtoParam,
		success: function (userInfo) {
			addAuth(userInfo);
		},
	})
}

/**
 * 사용자 추가 팝업 값 셋팅
 * @param {JSON} userInfo Ajax(/getUserList) response 데이터
 */
var addAuth = function (userInfo) {
	for (idx in userInfo) {
		var data = userInfo[idx];
		$('#AC01130P_eno').val(data.eno);
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