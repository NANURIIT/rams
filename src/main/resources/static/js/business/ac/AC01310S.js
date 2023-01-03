$(document).ready(function () {
	keyDownEnter();
});

/* 전역변수 */
let lv1Id = '';
let lv2Id = '';
let lv3Id = '';

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 메뉴명 조회 ( null 입력 시 전체 메뉴 조회 )
 */
function findClickbutton() {
	let menuNm = $('#findMenu').val();

	$.ajax({
		url: '/findMenu',
		data: { "menuNm": menuNm },
		success: function (data) {
			makeMenuList(data);
		}, error: function (status) {
			console.error("status : " + status);
		}
	})
}

/**
 * 사용여부와 수정가능여부 클릭 모션
 * @param {this} 체크박스 클릭 이벤트 발생한 <input>
 */
function checkboxModifyYn(e) {		// 수정가능여부
	let modifyYn = $(e);
	let thisTr = modifyYn.parent().parent();
	let checkedUseYn = thisTr.find('td:eq(4)').children();
	if (modifyYn.is(':checked')) {					// 수정가능 여부를 체크(사용)할 때,
		checkedUseYn.prop('checked', true);			// 사용 여부도 체크를 한다.
	}
}
function checkboxUseYn(e) {		// 사용여부
	let useYn = $(e);
	let thisTr = useYn.parent().parent();
	let checkedModifyYn = thisTr.find('td:eq(5)').children();
	if (!useYn.is(':checked')) {							// 사용 여부를 취소할 때,
		if (checkedModifyYn.is(':checked')) {				// 수정가능 여부가 체크 되어 있으면,
			checkedModifyYn.prop('checked', false);			// 수정가능 여부를 취소한다.
		}
	}

}

/**
 * 메뉴명 조회란에서 엔터 입력
 */
function keyDownEnter() {
	$("input[id=findMenu]").keydown(function (key) {
		if (key.keyCode == 13) {		// 엔터키 입력 시 실행 (엔터의 keyCode 13)
			findClickbutton();
		}
	});
}

/**
 * 스크롤 액션 (테이블 reload 시 맨위로 스크롤 이동)
 */
function scrollAction() {
	let position = $('#makeMenuByAuthList').find('tr:eq(0)').position();	// 테이블 데이터 중 최상단 row의 position 위치를 받아오기.
	$('.tableFixHead').animate({scrollTop: position});						// 받아온 위치값으로 원하는 <table>의 '상위태그 class'를 타겟으로 animate 조절.
}

/*******************************************************************
 *** 상단 그리드 event
 *******************************************************************/
/**
 * 메뉴 목록 출력 ( order by menu_id > 순번 rownum 정렬 )
 * @param {data} ajax로 response 받은 JSON data
 */
function makeMenuList(data) {

	let html = '';

	if (data.length <= 0) {
		html += '<tr>';
		html += '    <td colspan="3" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	} else if (data.length > 0) {
		$.each(data, function (key, value) {
			html += '<tr ondblclick="selectMenuRow(this);">';
			html += '<td style="text-align:right;">' + value.rowNum + '</td>';
			html += '<td>' + value.menuName + '</td>';
			html += '<td>' + value.menuId + '</td>';
			html += '<input type="hidden" value="' + value.lv1Id + '" />';
			html += '<input type="hidden" value="' + value.lv2Id + '" />';
			html += '<input type="hidden" value="' + value.lv3Id + '" />';
			html += '</tr>';
		})
	}
	$('#makeMenuList').html(html);

};

/**
 * 메뉴 권한 조회 ( 상단 그리드의 메뉴, 항목 더블클릭 )
 * @param {this} 더블클릭 이벤트 발생한 <tr>
 */
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

/*******************************************************************
 *** 하단 그리드 event
 *******************************************************************/
/**
 * 권한별 메뉴의 사용, 수정 여부 목록 출력
 * @param {MENU_ID MAP} 메뉴ID 값을 담아 서버에 요청
 */
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
				html += '<td style="text-align:right;">' + rowNum + '</td>';
				html += '<td id="setRghtCd">' + value.rghtCd + '</td>';
				html += '<td>' + value.rghtCdNm + '</td>';
				html += '<td>' + value.rghtCdExpl + '</td>';
				html += '<td>' + '<input id="setUseYn" style="width: 100%;" type="checkbox" onclick="checkboxUseYn(this);"/>' + '</td>';
				html += '<td>' + '<input id="setModifyYn" style="width: 100%;" type="checkbox" onclick="checkboxModifyYn(this);"/>' + '</td>';
				html += '<td style="text-align:center;" id="setHndlDt"></td>';
				html += '<td style="text-align:center;" id="setHndlTm"></td>';
				html += '<td style="text-align:center;" id="setHndlPEno"></td>';
				html += '</tr>';
			})
			$('#makeMenuByAuthList').html(html);
			checkUseAndModifyYn(rowNum);
		}, fail: function (status) {
			return console.error("error status : " + status);
		},
	})

};

/**
 * 메뉴별 권한관리 prop('checked')
 * @param {int} rowNum for문을 테이블의 길이 만큼으로 제한하기 위해
 */
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
				var tableRghtCd = $('#makeMenuByAuthList').find('tr:eq(' + i + ') > td:eq(1)').html();
				var target = $('#makeMenuByAuthList').find('tr:eq(' + i + ')');
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
		}, error: function (request) {
			console.error("error code:" + request.status);
		}
	})
}

/**
 * 권한코드에 따른 사용, 수정 가능 여부를 체크
 */
var saveUseMenu = function () {
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
		if (!(tr.children().eq(5).children().prop('checked'))) {
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
	})
	/* 
	모든 항목(체크된 항목이 없을 경우) 또는 N개의 권한을 수정할 경우
	해당 화면의 lv1Id, lv2Id, lv3Id와 권한코드, SQ를 넘겨
	해당하는 데이터를 수정한다.
	*/
	let tableRow = $('#makeMenuByAuthList').children();
	tableRow.each(function (i) {
		let hndlPEno = $(this).children().eq(8).text();
		if (hndlPEno != 0) {
			sq = tableRow.eq(i).children().eq(1).val();
			saveRghtCd = tableRow.eq(i).children().eq(1).html();
			let use = $(this).children().eq(4).children();
			let modify = $(this).children().eq(5).children();
			if (!use.is(':checked') && !modify.is(':checked')) {
				dtoParam.push({
					"sq": sq
					, "menuId": "rghtCdCancel"		// 서버에서 데이터 수정에 필요한 default 값
					, "rghtCd": saveRghtCd
					, "lv1Id": lv1Id
					, "lv2Id": lv2Id
					, "lv3Id": lv3Id
				});
			}
		}
	})

	// console.log(dtoParam);
	if (dtoParam.length > 0) {
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
			}, error: function (status) {
				console.error("error status : " + status);
			}
		})
	} else if (dtoParam.length <= 0) {
		openPopup({
			title: '실패',
			text: '화면을 선택해주세요.',
			type: 'error',
		});
	}
}