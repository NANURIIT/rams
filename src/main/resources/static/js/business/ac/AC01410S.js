$(document).ready(function() {

menuSearch();



});

/**
 * 메뉴관리
 */
function menuSearch() {
	$(document).on('click', '#menuSearch', function() {
		let menuNm = $('#menuNm').val()
		getmenuSearchList(menuNm);
	});
}


function getmenuSearchList(menuNm){

	let dtoParam = {
		"menuNm": menuNm
	}

	$.ajax({
		type: "GET",
		url: "/highMenuList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#menuListTable').html(a);
			rebuildMenuListTable(data);
		}
	});

}

function rebuildMenuListTable(data){
	var html ='';
	var menuList = data;
	
	if (menuList.length > 0) {
		$.each(menuList, function (key, value){
			html += '<tr>';
			html += '	<td><input type="checkbox"></td>';		//삭제
			html += '	<td>'+ value.menuId + '</td>';	//메뉴ID
			html += '	<td>'+ value.srtNo+ '</td>'; 	//정렬번호
			html += '	<td>'+ value.urlRrmtrCntnt+ '</td>';	//화면번호
			html += '	<td>'+ value.menuNm + '</td>';	//메뉴명
			html += '	<td>'+ value.shrtNm + '</td>';	//메뉴설명
			html += '	<td>'+ value.urlDvdCd + '</td>';	//URL문류코드
			html += '	<td><button class=" btn btn-warning btn-xs"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';	 //하위메뉴
			html += '	<td>'+ value.hndlDyTm + '</td>'; 	//처리일시
			html += '	<td>'+ value.hhdlPEno+ '</td>';		//처리자
			html += '</tr>';	
		})
	} else {
		hrml += '<tr>';
		html += '	<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';	
		html +='</tr>';
	}
	$('#menuListTable').html(html);
	
}


/**
 * 그룹코드의 메뉴관리 상세버튼 클릭
 */
function clickDetailButton() {
	$(document).on('click', '.groupCodeDetail', function(e) {
		e.preventDefault();
		codeId = $(this).attr('id');
		getGroupCodeInfo($(this).attr('id'));
	});
}