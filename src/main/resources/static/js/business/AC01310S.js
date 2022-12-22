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

// 메뉴 권한 조회 ( 해당 메뉴의 'tr' 더블클릭 )
function selectMenuRow(e) {

	var lv1Id = $(e).find('input:eq(0)').val();
	var lv2Id = $(e).find('input:eq(1)').val();
	var lv3Id = $(e).find('input:eq(2)').val();

	$.ajax({
		url: '/menuByAuth',
		data: {
			"lv1Id": lv1Id
			, "lv2Id": lv2Id
			, "lv3Id": lv3Id
		}, success: function (data) {
			console.log(lv1Id, lv2Id, lv3Id);
			makeMenuByAuthList(lv1Id, lv2Id, lv3Id, data);
		},
	})
}

/* 권한별 메뉴의 사용, 수정 여부 목록 출력 */
var makeMenuByAuthList = function (lv1Id, lv2Id, lv3Id, data) {

	let rowNum = "0"
	let html = '';
	$.each(data, function (key, value) {
		console.log(value.menuId)
		if (value.menuId == lv2Id || value.menuId == null) {
			rowNum++;
			html += '<tr>';
			html += '<td>' + rowNum + '</td>';														// 순번
			html += '<td>' + value.rghtCd + '</td>';												// 권한코드
			html += '<td>' + value.rghtCdNm + '</td>';												// 권한명
			html += '<td>' + value.rghtCdExpl + '</td>';											// 권한설명
			html += '<td>' + value.rghtCcd + '</td>';												// 권한구분
			if (value.mdfyRghtCcd === "1" || value.mdfyRghtCcd === "2") {
				html += '<td>' + '<input style="width: 15px;" type="checkbox" checked />' + '</td>';
			} else {
				html += '<td>' + '<input style="width: 15px;" type="checkbox" />' + '</td>';
			}																						// 사용여부
			if (value.mdfyRghtCcd === "2") {
				html += '<td>' + '<input style="width: 15px;" type="checkbox" checked />' + '</td>';
			} else {
				html += '<td>' + '<input style="width: 15px;" type="checkbox" />' + '</td>';
			}																						// 수정가능여부
			html += '<td>' + value.hndlDt + '</td>';												// 처리일자;
			html += '<td>' + value.hndlTm + '</td>';												// 처리시간;
			html += '<td>' + value.hndlPEno + '</td>';												// 처리자;
			html += '</tr>';
		}
	})
	// console.log(html);
	$('#AC01310S_makeMenuByAuthList').html(html);

};



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