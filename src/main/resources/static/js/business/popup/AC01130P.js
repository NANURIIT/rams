$(document).ready(function () {

});

/**
 * 모달 팝업 show
 */
function callAC01130P() {
	$('#modal-AC01130P').modal('show');
}

/**
 * 오늘의 날짜
 */
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var recallDay = year + "-" + month + "-" + day;

/**
 * AC01130P 팝업 페이지 초기화
 */
var resetTable = function () {
	$('#AC01130P_eno').val("");
	$('#AC01130P_empNm').val("");
	$('#AC01130P_rghtCd').val("").prop('selected, true');
	$('#AC01130P_datepicker1').val("");
	$('#AC01130P_datepicker2').val("");
	$('#AC01130P_rgstRsn').val("");
	$('#AC01130P_rgstPEno').text("");
	$('#AC01130P_rgstDt').text("");
	$('#AC01130P_hndlPEno').text("");
	$('#AC01130P_hndlDyTm').text("");
};

function openModalAC01120P() {
	$('#open_modal_AC01120P').click(function () {
		resetTable();
	});
}

/**
 * 권한 저장 ajax
 */
var saveUserData = function () {
	let eno = $('#AC01130P_eno').val();
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

	if (dtoParam.rghtCd != "") {
		$.ajax({
			method: 'POST',
			url: '/insertUser',
			data: JSON.stringify(dtoParam),
			contentType: "application/json; charset=UTF-8",
			// dataType: 'json',
			success: function () {
				openPopup({
					title: '성공',
					text: '저장이 완료되었습니다.',
					type: 'success',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							resetTable();
							modalClose_AC01130P();
							reload(empNm);
						})
					}
				})
			},
			error: function (request) {
				console.log("code:" + request.status);
			}
		});
	} else if (dtoParam.rghtCd == "") {			// 권한구분을 '전체(value == null)'로 선택했을 때
		openPopup({
			title: '실패',
			text: '권한구분을 선택해주세요.',
			type: 'error',
		})
	}
}

/**
 * close AC01130P modal
 */
function modalClose_AC01130P() {
	resetTable();
	$('#modal-AC01130P').modal('hide');
}

/**
 * 사용자 삭제(사원 퇴사) ajax
 */
var deleteUser = function () {

	let eno = $('#AC01130P_eno').val();
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

/**
 * 쿼리 실행 시 페이지 리로드 
 */
var reload = function (empNm) {
	// let emp = $('#AC01130P_empNm').val();
	let rghtCd = $("#AC01130P_rghtCd option:selected").val();
	let dltY = "0";
	//console.log(empNm +", "+ rghtCd +", "+ dltY)
	findUser(empNm, rghtCd, dltY);
}

/**
 * 즉시회수 버튼 클릭 이벤트
 */
var recall = function () {
	$('#AC01130P_datepicker2').val(recallDay);
};