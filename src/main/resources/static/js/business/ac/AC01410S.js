$(document).ready(function() {
//상위메뉴 조회
menuSearch();
//상위메뉴 상세버튼 클릭
clickDetailButton(); 


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
			html += '	<td><input type="checkbox" id="'+ value.menuId +'"></td>';		//삭제
			html += '	<td>'+ value.menuId + '</td>';	//메뉴ID
			html += '	<td>'+ value.srtNo+ '</td>'; 	//정렬번호
			html += '	<td>'+ value.urlPrmtrCntnt+ '</td>';	//화면번호
			html += '	<td>'+ value.menuNm + '</td>';	//메뉴명
			html += '	<td>'+ value.shrtNm + '</td>';	//메뉴설명
			html += '	<td>'+ value.urlDvdCd + '</td>';	//URL문류코드
			html += '	<td><button class="highMenuDetail btn btn-warning btn-xs" id="'+value.menuId +'"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';	 //하위메뉴
			html += '	<td>'+ value.hndlDyTm + '</td>'; 	//처리일시
			html += '	<td>'+ value.hndlPEno+ '</td>';		//처리자
			if(value.dltF === 'N'){
				html += '  <td><input style="width:100%"  type="checkbox" checked></td>';
			} else {
				html += '  <td><input style="width:100%"  type="checkbox" ></td>';
			}
			html += '</tr>';	
		})
	} else {
		html += '<tr>';
		html += '	<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';	
		html +='</tr>';
	}
	$('#menuListTable').html(html);
	
}


/**
 * 그룹코드의 메뉴관리 상세버튼 클릭
 */
function clickDetailButton() {
	$(document).on('click', '.highMenuDetail', function(e) {
		e.preventDefault();
		menuId = $(this).attr('id');
		getMeunIdInfo($(this).attr('id'));
	});
}

/*상위메뉴 상세보기 데이터 호출  */
var getMeunIdInfo = function(menuId){
	$.ajax({
		url: 'highMenuInfo?menuId=' + menuId,
		method: 'GET',
		dataType: 'json'
	}).done(function (highMenuList) {
		let html = '';
		if (highMenuList.length > 0) {
			for (let i = 0; i < highMenuList.length; i++){
				let menuInfo = highMenuList[i];
			
				html += '<tr id="' + menuId + '">';
				html += '   <td><input id="' + menuInfo.menuId + '" style="width:100%" type="checkbox"><input type="hidden" value="' + menuId + '"></td>';
				html += '   <td class="update_column">' + menuInfo.menuId + '</td>';	//메뉴ID
				html += '   <td class="update_column">' + menuInfo.srtNo + '</td>';		//정령번호
				html += '   <td class="update_column">' + menuInfo.urlPrmtrCntnt + '</td>';		//화면번호
				html += '   <td class="update_column">' + menuInfo.menuNm + '</td>';		//메뉴명
				html += '   <td class="update_column">' + menuInfo.shrtNm + '</td>';		//메뉴설명	
				html += '   <td class="update_column">' + menuInfo.urlNm + '</td>';		//화면ID
				html += '   <td class="update_column">' + menuInfo.urlDvdCd + '</td>';		//URL분류코드
				html += '   <td class="update_column">' + menuInfo.hndlDyTm + '</td>';		//처리일
				html += '   <td class="update_column">' + menuInfo.hndlPEno + '</td>';		//처리자
				if(menuInfo.dltF === 'N'){
					html += '  <td><input style="width:100%"  type="checkbox" checked></td>';
				} else {
					html += '  <td><input style="width:100%"  type="checkbox" ></td>';
				}
				html += '<tr></tr>';
				
			}
			
		} else {
			html += '<tr>';
			html += '	<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
			html += '</tr>';
		}
		
		$('#subMenuListTable').html(html);
		
	});
		
	
}
