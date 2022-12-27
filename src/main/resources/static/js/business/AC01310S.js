$(document).ready(function () {
	setKeyDownFunction();
});

/* 메뉴명 조회 ( null 입력 시 전체 메뉴 조회 ) */
var AC01310S_findClickbutton = function () {
	let menuNm = $('#AC01310S_findMenu').val();

	$.ajax({
		url: '/findMenu',
		data: { "menuNm": menuNm },
		success: function (data) {
			makeMenuList(data);
		},
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

let lv1Id = '';
let lv2Id = '';
let lv3Id = '';

// 메뉴 권한 조회 ( 해당 메뉴의 'tr' 더블클릭 )
function selectMenuRow(e) {

	lv1Id = $(e).find('input:eq(0)').val();
	lv2Id = $(e).find('input:eq(1)').val();
	lv3Id = $(e).find('input:eq(2)').val();

	$.ajax({
		url: '/menuByAuth',
		data: {
			"lv1Id": lv1Id
			, "lv2Id": lv2Id
			, "lv3Id": lv3Id
		}, success: function (data) {
			// console.log(lv1Id, lv2Id, lv3Id);
			makeMenuByAuthList(data);
		},
	})
}

/* 권한별 메뉴의 사용, 수정 여부 목록 출력 */
var makeMenuByAuthList = function (data) {
	let rowNum = 0;
	let html = '';

	/* make authority table */
	$.each(data, function (key, value) {
		rowNum++;
		html += '<tr class="modifyAuthTable">';
		html += '<td>' + rowNum + '</td>';
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
						}
						if (val.mdfyRghtCcd === "2") {
							target.find('#setModifyYn').prop('checked', true);
						}
						target.find('#setHndlDt').html(val.hndlDyTm.substring(0, 10));
						target.find('#setHndlTm').html(val.hndlDyTm.substring(11, 19));
						target.find('#setHndlPEno').html(val.hndlPEno);
					}
					// RAA95B insert, delete를 위한 sq 값
					$('#AC01310S_saveSq').val(val.sq);
				})
			}
		}, error: function (request, status, error) {
			// console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	})
}

var saveUseMenu = function (i) {
	let saveSq = $('#AC01310S_saveSq').val();
	let useCheckbox = $('input:checkbox[id="setUseYn"]:checked');
	let modifyCheckbox = $('input:checkbox[id="setModifyYn"]:checked');
	let saveRghtCd = '';

	let dtoParam = [];

	useCheckbox.each(function (i) {
		let tr = useCheckbox.parent().parent().eq(i);
		saveRghtCd = tr.children().eq(1).html();
		// console.log('useCheckbox saveRghtCd :' + saveRghtCd.html());
		if (lv2Id != 'null' && lv3Id == 'null') {
			if (!(tr.children().eq(6).children().prop('checked'))) {
				dtoParam.push({
					"sq": Number(saveSq)
					, "rghtCd": saveRghtCd
					, "mdfyRghtCcd": '1'
					, "menuId": lv2Id
					, "lv1Id": lv1Id
				});
			};
		};
	});
	modifyCheckbox.each(function (i) {
		let tr = modifyCheckbox.parent().parent().eq(i);
		saveRghtCd = tr.children().eq(1).html();
		// console.log('modifyCheckbox saveRghtCd :' + saveRghtCd.html());
		if (lv2Id != 'null' && lv3Id == 'null') {
			dtoParam.push({
				"sq": Number(saveSq)
				, "rghtCd": saveRghtCd
				, "mdfyRghtCcd": '2'
				, "menuId": lv2Id
				, "lv1Id": lv1Id
			});
		}
	})

	console.log(dtoParam, lv1Id, lv2Id, lv3Id);

	$.ajax({
		url: '/saveUseMenu',
		method: 'PATCH',
		data: JSON.stringify(dtoParam),
		contentType: "application/json; charset=UTF-8",
		// dataType: 'json',
		success: function () {
			alert("Success!");
		}, error: function (request, status, error) {
			console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
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