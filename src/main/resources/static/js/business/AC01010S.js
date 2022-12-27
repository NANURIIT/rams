$(function () {
	getCommonCodeInfo();
	//getGroupCodeInfoList();
	deleteEnterEvent();

	selectCommonCode();

	clickDetailButton();
	doubleClickColumn();
});

/**
 * select박스 코드 그룹 호출 함수
 */
var getCommonCodeInfo = function () {
	$.ajax({
		url: '/commonCodeInfo',
		method: 'GET',
		dataType: 'json'
	}).done(function (commonCodeInfo) {
		let commonCodeOption = '<option value="">전체</option>';
		for (let i = 0; i < commonCodeInfo.length; i++) {
			let commonCode = commonCodeInfo[i];
			commonCodeOption += '<option value="' + commonCode.cmnsCdGrp + '">' + commonCode.cmnsCdGrp + '(' + commonCode.cmnsCdGrpExpl + ')</option>';
		}
		$('#commonCodeInfo').html(commonCodeOption);
	});
}

/**
 * 엔터키 입력 이벤트 삭제
 */
function deleteEnterEvent() {
	$(document).keypress(function (e) {
		if (e.keyCode == 13) {
			e.preventDefault();
		}
	});
}

/**
 * 코드구분 select박스 선택
 */
function selectCommonCode() {
	$(document).on('click', '#commonCodeSearch', function () {
		let cmnsCdGrp = $('#commonCodeInfo option:selected').val()
		getGroupCodeInfoList(cmnsCdGrp);
	});
}

/**
 * 그룹코드의 코드관리 상세버튼 클릭
 */
function clickDetailButton() {
	$(document).on('click', '.groupCodeDetail', function (e) {
		e.preventDefault();
		codeId = $(this).attr('id');
		getGroupCodeInfo($(this).attr('id'));
	});
}

/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
function doubleClickColumn() {
	$(document).on('dblclick', '.update_column', function () {
		let trClass = $(this).attr('class').split(' ')[1]
		tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
		$(this).html(tdInputHTML);
	});
}

/**
 * 그룹코드 행추가 버튼 클릭
 */
function addGroupCodeRow() {
	let ROW_HTML = '';
	ROW_HTML += '<tr>';
	ROW_HTML += '   <td><input style="width:100%" type="checkbox"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td><input class="group_code_use_yn" style="width:100%" type="checkbox"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '</tr>';
	$('#groupCodeListTable').append(ROW_HTML);
}

/**
 * 그룹코드 행삭제 버튼 클릭
 */
function deleteGroupCodeRow() {
	let groupCodeList = new Array();
	let tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
		if (deleteCheckBox.is(":checked")) {
			groupCodeList.push(deleteCheckBox.attr("id"));
		}
	}

	if (groupCodeList.length != 0) {
		deleteGroupCode(groupCodeList);
	}
}

/**
 * 그룹코드 저장 버튼 클릭
 */
function clickSaveGroupCode() {
	let groupCodeList = new Array();

	let tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let groupCode = new Object();

		let groupCodeInput = $(tr[i]).find("td:eq(1)").find("input");
		let groupCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
		let groupCodeLengthInput = $(tr[i]).find("td:eq(4)").find("input");
		let groupCodeUseYn = $(tr[i]).find("td:eq(7)").find(".group_code_use_yn").prop("checked");
		let groupCodeUseYnCheck = $(tr[i]).find("td:eq(7)").find(".hidden_yn").val();
		let groupCodeExplainInput = $(tr[i]).find("td:eq(6)").find("input");

		if (groupCodeInput.length == 1) {
			if (groupCodeInput.val().length > 4) {
				openPopup({
					title: '실패',
					text: '그룹코드는 4자리 이하여야 합니다.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeInput.focus();
						});
					}
				});
				return;
			} else if (!groupCodeInput.val()) {
				openPopup({
					title: '실패',
					text: '그룹코드를 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrp = groupCodeInput.val();
		}

		if (groupCodeNameInput.length == 1) {
			if (!groupCodeNameInput.val()) {
				openPopup({
					title: '실패',
					text: '그룹명을 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeNameInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdNm = groupCodeNameInput.val();
		}

		if (groupCodeLengthInput.length == 1) {
			if (!groupCodeLengthInput.val()) {
				openPopup({
					title: '실패',
					text: '코드 길이를 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			} else if (isNaN(groupCodeLengthInput.val())) {
				openPopup({
					title: '실패',
					text: '코드 길이를 숫자로 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cdLngth = groupCodeLengthInput.val();
		}

		if (groupCodeExplainInput.length == 1) {
			if (!groupCodeExplainInput.val()) {
				openPopup({
					title: '실패',
					text: '코드 설명을 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							groupCodeExplainInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrpExpl = groupCodeExplainInput.val();
		}

		if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
			groupCode.useF = groupCodeUseYn ? 'Y' : 'N';
		}

		if (!(Object.keys(groupCode).length === 0)) {
			groupCode.oldCmnsCdGrp = $(tr[i]).find("td:eq(0)").find("input").attr("id");
			groupCodeList.push(groupCode);
		}
	}

	if (groupCodeList.length != 0) {
		saveGroupCode(groupCodeList);
	}
}

/**
 * 코드 행추가 버튼 클릭
 */
function addCodeRow() {
	let td = $('#codeListTable').children().find('td');

	let ROW_HTML = '';
	ROW_HTML += '<tr>';
	ROW_HTML += '   <td><input style="width:100%" type="checkbox"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td><input style="width: 100%;" type="text"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '   <td></td>';
	ROW_HTML += '</tr>';

	if (td.length === 1) {
		$('#codeListTable').html(ROW_HTML);
	} else if (td.length > 1) {
		$('#codeListTable').append(ROW_HTML);
	}
}

/**
 * 코드 행삭제 버튼 클릭
 */
function deleteGroupRow() {
	let request = new Object();
	let codeList = new Array();
	let tr = $('#codeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let deleteCheckBox = $(tr[i]).find('input');

		if (deleteCheckBox.prop('checked')) {
			codeList.push(deleteCheckBox.attr('id'));
		}
	}

	if (codeList.length > 0) {
		request.cmnsCdGrp = $(tr[0]).attr('id')
		request.cdVlIds = codeList;
	}

	if (Object.keys(request).length > 0) {
		deleteCode(request);
	}
}

/**
 * 코드 저장 버튼 클릭
 */
function clickSaveCode() {
	let codeList = new Array();
	let tr = $('#codeListTable').children();
	for (let i = 0; i < tr.length; i++) {
		let code = new Object();

		// TODO => 변수 할당 확인
		let groupCodeId = codeId;
		let oldCodeId = $(tr[i]).find("td:eq(0)").find("input").attr('id');
		let codeInput = $(tr[i]).find("td:eq(1)").find("input");
		let codeNameInput = $(tr[i]).find("td:eq(2)").find("input");
		let codeUseYn = $(tr[i]).find("td:eq(5)").find(".code_use_yn").prop("checked");
		let codeUseYnCheck = $(tr[i]).find("td:eq(5)").find(".hidden_yn").val();

		if (codeInput.length == 1) {
			if (!codeInput.val()) {
				openPopup({
					title: '실패',
					text: '코드를 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							codeInput.focus();
						});
					}
				});
				return;
			} else if (codeInput.val().length > 4) {
				openPopup({
					title: '실패',
					text: '코드는 4자리 이하로 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							codeInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlId = codeInput.val();
		}

		if (codeNameInput.length == 1) {
			if (!codeNameInput.val()) {
				openPopup({
					title: '실패',
					text: '코드명을 입력해주세요.',
					type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							codeNameInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlNm = codeNameInput.val();
		}

		if (!codeUseYnCheck || (codeUseYn && codeUseYnCheck === 'n') || (!codeUseYn && codeUseYnCheck === 'y')) {
			code.useF = codeUseYn ? 'Y' : 'N';
		}

		if (!(Object.keys(code).length === 0)) {
			code.oldCdVlId = oldCodeId;
			code.cmnsCdGrp = groupCodeId;
			codeList.push(code);
		}
	}

	if (codeList.length > 0) {
		saveCode(codeList);
	}
}

/**
 * 그룹코드 리스트 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfoList = function (cmnsCdGrp) {
	let _url = '/groupCodeInfoList';

	if (cmnsCdGrp) {
		_url += '?cmnsCdGrp=' + cmnsCdGrp;
	}

	$.ajax({
		url: _url,
		method: 'GET',
		dataType: 'json'
	}).done(function (groupCodeInfoList) {
		let groupCodeInfoHTML = '';
		if (groupCodeInfoList.length > 0) {
			for (let i = 0; i < groupCodeInfoList.length; i++) {
				let groupCodeInfo = groupCodeInfoList[i];
				groupCodeInfoHTML += '<tr>';
				groupCodeInfoHTML += '  <td><input id="' + groupCodeInfo.cmnsCdGrp + '" style="width:100%" type="checkbox"></td>';
				groupCodeInfoHTML += '  <td class="update_column group_code">' + groupCodeInfo.cmnsCdGrp + '</td>';
				groupCodeInfoHTML += '  <td class="update_column group_code_name">' + groupCodeInfo.cmnsCdNm + '</td>';
				groupCodeInfoHTML += '  <td></td>';
				groupCodeInfoHTML += '  <td class="update_column group_code_length">' + groupCodeInfo.cdLngth + '</td>';
				groupCodeInfoHTML += '  <td><button class="groupCodeDetail" id="' + groupCodeInfo.cmnsCdGrp + '">↓상세</button></td>';
				groupCodeInfoHTML += '  <td class="update_column">' + groupCodeInfo.cmnsCdGrpExpl + '</td>';
				if (groupCodeInfo.useF === 'Y') {
					groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
				} else {
					groupCodeInfoHTML += '  <td><input style="width:100%" class="group_code_use_yn" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
				}
				groupCodeInfoHTML += '  <td>' + groupCodeInfo.rgstDt + '</td>';
				groupCodeInfoHTML += '  <td></td>';
				groupCodeInfoHTML += '  <td></td>';
				groupCodeInfoHTML += '</tr>';
			}
		} else {
			groupCodeInfoHTML += '<tr>';
			groupCodeInfoHTML += '	<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';
			groupCodeInfoHTML += '</tr>';
		}

		$('#groupCodeListTable').html(groupCodeInfoHTML);
	});
}

/**
 * 그룹코드 상세보기 데이터 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfo = function (cmnsCdGrp) {
	$.ajax({
		url: 'groupCodeInfo?cmnsCdGrp=' + cmnsCdGrp,
		method: 'GET',
		dataType: 'json'
	}).done(function (codeInfoList) {
		let codeInfoHTML = '';
		if (codeInfoList.length > 0) {
			for (let i = 0; i < codeInfoList.length; i++) {
				let codeInfo = codeInfoList[i];
				codeInfoHTML += '<tr id="' + cmnsCdGrp + '">';
				codeInfoHTML += '   <td><input id="' + codeInfo.cdVlId + '" style="width:100%" type="checkbox"><input type="hidden" value="' + cmnsCdGrp + '"></td>';
				codeInfoHTML += '   <td class="update_column">' + codeInfo.cdVlId + '</td>';
				codeInfoHTML += '   <td class="update_column">' + codeInfo.cdVlNm + '</td>';
				codeInfoHTML += '   <td></td>';
				codeInfoHTML += '   <td>' + codeInfo.cdSq + '</td>';
				if (codeInfo.useF === 'Y') {
					codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox" checked><input class="hidden_yn" type="hidden" value="y"></td>';
				} else {
					codeInfoHTML += '   <td><input class="code_use_yn" style="width:100%" type="checkbox"><input class="hidden_yn" type="hidden" value="n"></td>';
				}
				codeInfoHTML += '   <td>' + codeInfo.rgstDt + '</td>';
				codeInfoHTML += '   <td>' + codeInfo.rgstPEno + '</td>';
				if(isEmpty(codeInfo.hndlDyTm)) {
					codeInfoHTML += '   <td> - </td>';
				} else {
					codeInfoHTML += '   <td>' + codeInfo.hndlDyTm + '</td>';
				}
				
				codeInfoHTML += '   <td>' + codeInfo.hndlPEno + '</td>';
				codeInfoHTML += '</tr>';
			}
		} else {
			codeInfoHTML += '<tr>';
			codeInfoHTML += '	<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
			codeInfoHTML += '</tr>';
		}

		$('#codeListTable').html(codeInfoHTML);
	});
}

/**
 * 그룹코드 저장 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var saveGroupCode = function (groupCodeList) {
	$.ajax({
		method: 'POST',
		url: '/registGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: function () {
			getGroupCodeInfoList();
			getCommonCodeInfo();
		},
		error: function (response) {
			let message = response.responseJSON.message;
			openPopup({
				title: '실패',
				text: message
			});
		}
	});
}

/**
 * 그룹코드 행 삭제 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var deleteGroupCode = function (groupCodeList) {
	$.ajax({
		method: 'PATCH',
		url: '/deleteGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			getGroupCodeInfoList();
			getCommonCodeInfo();
		},
		error: function (response) {

		}
	});
}

/**
 * 코드 저장 처리
 * @param {list} codeList 코드 리스트
 */
var saveCode = function (codeList) {
	let cmnsCdGrp = codeList[0].cmnsCdGrp;
	$.ajax({
		method: 'POST',
		url: '/registCodeInfo',
		data: JSON.stringify(codeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			getGroupCodeInfo(cmnsCdGrp);
		},
		error: function (response) {
			let message = response.responseJSON.message;
			openPopup({
				title: '실패',
				text: message
			});
		}
	});
}

/**
 * 코드 삭제 처리
 * @param {list} request 삭제코드 리스트
 */
var deleteCode = function (request) {
	let cmnsCdGrp = request.cmnsCdGrp;
	$.ajax({
		method: 'PATCH',
		url: '/deleteCodeInfo',
		data: JSON.stringify(request),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			getGroupCodeInfo(cmnsCdGrp);
		},
		error: function (response) {
			console.log(response);
		}
	});
}

let codeId = '';