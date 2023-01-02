$(document).ready(function () {
	setKeyDownFunction();
});

/* 전역변수 */
let lv1Id = '';
let lv2Id = '';
let lv3Id = '';

/* 메뉴명 조회 ( null 입력 시 전체 메뉴 조회 ) */
var AC01310S_findClickbutton = function () {
	let menuNm = $('#AC01310S_findMenu').val();

	$.ajax({
		url: '/findMenu',
		data: { "menuNm": menuNm },
		success: function (data) {
			makeMenuList(data);
		}, error: function (request, status, error) {
			console.error("status : " + status + "error : " + error);
		}
	})
}

/* 메뉴 목록 출력 ( order by menu_id > 순번 rownum 정렬 ) */
var makeMenuList = function (data) {

	let html = '';

	$.each(data, function (key, value) {
		html += '<tr ondblclick="selectMenuRow(this);">';
		html += '<td>' + value.rowNum + '</td>';
		html += '<td>' + value.menuName + '</td>';
		html += '<td>' + value.menuId + '</td>';
		html += '<input class="menuIdValue" type="hidden" value="' + value.lv1Id + '" />';
		html += '<input class="menuIdValue" type="hidden" value="' + value.lv2Id + '" />';
		html += '<input class="menuIdValue" type="hidden" value="' + value.lv3Id + '" />';
		html += '</tr>';
	})
	// console.log(html);
	$('#AC01310S_makeMenuList').html(html);

};

// 메뉴 권한 조회 ( 해당 메뉴의 'tr' 더블클릭 )
function selectMenuRow(e) {

	lv1Id = $(e).find('input:eq(0)').val();
	lv2Id = $(e).find('input:eq(1)').val();
	lv3Id = $(e).find('input:eq(2)').val();

	let idParam = {
		"lv1Id": lv1Id
		, "lv2Id": lv2Id
		, "lv3Id": lv3Id
	}

	makeMenuByAuthList(idParam);
	scrollAction();
}

/* 권한별 메뉴의 사용, 수정 여부 목록 출력 */
var makeMenuByAuthList = function (idParam) {
	let rowNum = 0;
	let html = '';

	$.ajax({
		url: '/menuByAuth',
		data: idParam,
		success: function (data) {

			/* make authority table */
			$.each(data, function (key, value) {
				rowNum++;
				html += '<tr>';
				html += '<td id="sqValue">' + rowNum + '</td>';
				html += '<td id="setRghtCd">' + value.rghtCd + '</td>';
				html += '<td>' + value.rghtCdNm + '</td>';
				html += '<td>' + value.rghtCdExpl + '</td>';
				html += '<td>' + value.rghtCcd + '</td>';
				html += '<td>' + '<input id="setUseYn" style="width: 15px;" type="checkbox" onclick="checkboxUseYn(this);"/>' + '</td>';
				html += '<td>' + '<input id="setModifyYn" style="width: 15px;" type="checkbox" onclick="checkboxModifyYn(this);"/>' + '</td>';
				html += '<td id="setHndlDt"></td>';
				html += '<td id="setHndlTm"></td>';
				html += '<td id="setHndlPEno"></td>';
				html += '</tr>';
			})
			$('#AC01310S_makeMenuByAuthList').html(html);
			checkUseAndModifyYn(rowNum);
			$('#AC01310S_makeMenuByAuthList').find('tr:eq(0)').focus();
		}, fail: function (status, err) {
			return console.error("error status : " + status + "error reason : " + err);
		},
	})

};

/* 메뉴별 권한관리 prop('checked) */
var checkUseAndModifyYn = function (rowNum) {
	$.ajax({
		url: '/checkAvailableMenu',
		data: {
			'lv1Id': lv1Id
			, 'lv2Id': lv2Id
			, 'lv3Id': lv3Id
		}, success: function (data) {
			/* 
			권한코드를 기준으로 DB에서 불러온 사용여부, 수정가능여부를 체크
			make authority table의 rowNum으로 권한코드 한 행씩을 조회하여
			DB데이터와 일치 하는 행이 있으면 사용가능, 수정가능 여부를 체크한다.
			*/
			for (var i = 0; i < rowNum; i++) {
				var tableRghtCd = $('#AC01310S_makeMenuByAuthList').find('tr:eq(' + i + ') > td:eq(1)').html();
				var target = $('#AC01310S_makeMenuByAuthList').find('tr:eq(' + i + ')');
				$.each(data, function (key, val) {
					if (tableRghtCd == val.rghtCd) {
						if (val.mdfyRghtCcd === "1" || val.mdfyRghtCcd === "2") {
							target.find('#setUseYn').prop('checked', true);
							target.find('#setRghtCd').val(val.sq);
						}
						if (val.mdfyRghtCcd === "2") {
							target.find('#setModifyYn').prop('checked', true);
							target.find('#setRghtCd').val(val.sq);
						}
						target.find('#setHndlDt').html(val.hndlDyTm.substring(0, 10));
						target.find('#setHndlTm').html(val.hndlDyTm.substring(11, 19));
						target.find('#setHndlPEno').html(val.hndlPEno);
					}
				})
			}
		}, error: function (request, status, error) {
			console.error("status : " + status + "error : " + error);
		}
	})
}

/* 권한코드에 따른 사용, 수정 가능 여부를 체크 */
var saveUseMenu = function (i) {
	let useCheckbox = $('input:checkbox[id="setUseYn"]:checked');
	let modifyCheckbox = $('input:checkbox[id="setModifyYn"]:checked');
	let saveRghtCd = '';
	let sq = '';

	let dtoParam = [];

	let idParam = {
		"lv1Id": lv1Id
		, "lv2Id": lv2Id
		, "lv3Id": lv3Id
	};

	/* 사용여부 */
	useCheckbox.each(function (i) {
		let tr = useCheckbox.parent().parent().eq(i);
		saveRghtCd = tr.children().eq(1).html();
		sq = tr.children().eq(1).val();
		/* 수정 가능하면 dtoParam 생성 금지 */
		if (!(tr.children().eq(6).children().prop('checked'))) {
			if (lv2Id != 'null' && lv3Id == 'null') {
				dtoParam.push({
					"sq": sq
					, "rghtCd": saveRghtCd
					, "mdfyRghtCcd": '1'
					, "menuId": lv2Id
					, "lv1Id": lv1Id
					, "lv2Id": lv2Id
					, "lv3Id": lv3Id
				});
			} else if (lv3Id != 'null') {
				dtoParam.push({
					"sq": sq
					, "rghtCd": saveRghtCd
					, "mdfyRghtCcd": '1'
					, "menuId": lv3Id
					, "lv1Id": lv1Id
					, "lv2Id": lv2Id
					, "lv3Id": lv3Id
				});
			}
		};
	});
	/* 수정가능여부 */
	modifyCheckbox.each(function (i) {
		let tr = modifyCheckbox.parent().parent().eq(i);
		saveRghtCd = tr.children().eq(1).html();
		sq = tr.children().eq(1).val();
		if (lv2Id != 'null' && lv3Id == 'null') {
			dtoParam.push({
				"sq": sq
				, "rghtCd": saveRghtCd
				, "mdfyRghtCcd": '2'
				, "menuId": lv2Id
				, "lv1Id": lv1Id
				, "lv2Id": lv2Id
				, "lv3Id": lv3Id
			});
		} else {
			dtoParam.push({
				"sq": sq
				, "rghtCd": saveRghtCd
				, "mdfyRghtCcd": '2'
				, "menuId": lv3Id
				, "lv1Id": lv1Id
				, "lv2Id": lv2Id
				, "lv3Id": lv3Id
			});
		}
	});
	/* 
	체크된 항목이 없을 경우
	전역으로 선언된 lv1Id, lv2Id, lv3Id를 가져와서 해당 화면에 대한 모든 권한을 지워준다.
	*/
	let tableRow = $('#AC01310S_makeMenuByAuthList').children();
	tableRow.each(function (i) {
		let hndlPEno = $(this).children().eq(9).text();
		if (hndlPEno.length > 0) {
			sq = tableRow.eq(i).children().eq(1).val();
			saveRghtCd = tableRow.eq(i).children().eq(1).html();
			let use = $(this).children().eq(5).children();
			let modify = $(this).children().eq(6).children();
			if (!use.is(':checked') && !modify.is(':checked')) {
				dtoParam.push({
					"sq": sq
					, "menuId": "rghtCdCancel"
					, "rghtCd": saveRghtCd
					, "lv1Id": lv1Id
					, "lv2Id": lv2Id
					, "lv3Id": lv3Id
				});
			}
		}
	})

	console.log(dtoParam);
	$.ajax({
		url: '/saveUseMenu',
		method: 'PATCH',
		data: JSON.stringify(dtoParam),
		contentType: "application/json; charset=UTF-8",
		success: function () {
			openPopup({
				title: '성공',
				text: '저장이 완료되었습니다.',
				type: 'success',
				callback: function () {
					$(document).on('click', '.confirm', function () {
						scrollAction();
						makeMenuByAuthList(idParam);
					});
				}
			});
		}, error: function (request, status, error) {
			console.error("status : " + status + "error : " + error);
		}
	})
}

/* 사용여부와 수정가능여부 클릭 모션 */
function checkboxModifyYn(e) {
	var checkedUseYn = $(e).parent().parent().children().eq(5).children();
	if (!checkedUseYn.prop('checked')) {
		checkedUseYn.prop('checked', true);
	}
}
function checkboxUseYn(e) {
	var checkedUseYn = $(e);
	var checkedModifyYn = $(e).parent().parent().children().eq(6).children();
	if (checkedUseYn.prop('checked') == false) {
		checkedModifyYn.prop('checked', false);
	}
}

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

// search employee or deal
function keyDownEnter() {

	$("input[id=AC01310S_findMenu]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			AC01310S_findClickbutton();     // TODO: 엔터 검색을 클릭버튼 누르는 펑션으로 실행..확인요망
		}
	});
}

/* 스크롤 액션 (테이블 reload 시 맨위로 스크롤 이동) */
function scrollAction() {
	var position = $('#AC01310S_makeMenuByAuthList').find('tr:eq(0)').position();
	$('.grid_wrap').animate({ scrollTop: position });
}