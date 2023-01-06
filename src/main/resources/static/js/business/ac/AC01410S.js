$(document).ready(function() {
	//상위메뉴 조회
	menuSearch();
	//상위메뉴 상세버튼 클릭
	clickDetailButton(); 
	//변경 가능한 컬럼 더블클릭 했을시 input박스 생성
	doubleClick();

});

/*변경 가능한 컬럼 더블클릭 했을시 input박스 생성*/
function doubleClick() {
	$(document).on('dblclick', '.update_column', function () {
		let trClass = $(this).attr('class').split(' ')[1]
		tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
		$(this).html(tdInputHTML);
	});
}


function menuLoad(){
	let menuNm = $('#menuNm').val()
	getMenuSearchList(menuNm);
}

/*메뉴관리 조회버튼*/
function menuSearch() {
	$(document).on('click', '#menuSearch', function() {
		menuLoad();
	});
}


function getMenuSearchList(menuNm){

	let dtoParam = {
		"menuNm": menuNm
	}

	$.ajax({
		type: "GET",
		url: "/mainMenuList",
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
			html += '	<td class="update_column menuId">'+ value.menuId + '</td>';	//메뉴ID
			html += '	<td class="update_column">'+ value.srtNo+ '</td>'; 	//정렬번호
			html += '	<td class="update_column">'+ value.urlPrmtrCntnt+ '</td>';	//화면번호
			html += '	<td class="update_column">'+ value.menuNm + '</td>';	//메뉴명
			html += '	<td class="update_column">'+ value.shrtNm + '</td>';	//메뉴설명
			html += '	<td class="update_column">'+ value.urlDvdCd + '</td>';	//URL문류코드
			html += '	<td><button class="mainMenuDetail btn btn-warning btn-xs" id="'+value.menuId +'"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>';	 //하위메뉴
			html += '	<td>'+ value.hndlDyTm + '</td>'; 	//처리일시
			html += '	<td>'+ value.empNm+ '</td>';		//처리자
			if(value.dltF === 'N'){
				html += '  <td><input style="width:100%"  type="checkbox" checked></td>';
			} else {
				html += '  <td><input style="width:100%"  type="checkbox" ></td>';
			}
			html += '</tr>';	
		})
	} else {
		html += '<tr>';
		html += '	<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';	
		html +='</tr>';
	}
	$('#menuListTable').html(html);
	
}


/**
 * 그룹코드의 메뉴관리 상세버튼 클릭
 */
function clickDetailButton() {
	$(document).on('click', '.mainMenuDetail', function(e) {
		e.preventDefault();
		menuId = $(this).attr('id');
		getMenuIdInfo($(this).attr('id'));
	});
}

/*상위메뉴 상세보기 데이터 호출  */
var getMenuIdInfo = function(menuId){
	$.ajax({
		url: 'mainMenuInfo?menuId=' + menuId,
		method: 'GET',
		dataType: 'json'
	}).done(function (mainMenuList) {
		let html = '';
		if (mainMenuList.length > 0) {
			for (let i = 0; i < mainMenuList.length; i++){
				let menuInfo = mainMenuList[i];
			
				html += '<tr id="' + menuId + '">';
				html += '   <td><input id="' + menuInfo.menuId + '" style="width:100%" type="checkbox"><input type="hidden" value="' + menuId + '"></td>';
				html += '   <td class="update_column">' + menuInfo.menuId + '</td>';	//메뉴ID
				html += '   <td class="update_column">' + menuInfo.srtNo + '</td>';		//정령번호
				html += '   <td class="update_column">' + menuInfo.urlPrmtrCntnt + '</td>';		//화면번호
				html += '   <td class="update_column">' + menuInfo.menuNm + '</td>';		//메뉴명
				html += '   <td class="update_column">' + menuInfo.shrtNm + '</td>';		//메뉴설명	
				html += '   <td class="update_column">' + menuInfo.urlNm + '</td>';		//화면ID
				html += '   <td class="update_column">' + menuInfo.urlDvdCd + '</td>';		//URL분류코드
				html += '   <td>' + menuInfo.hndlDyTm + '</td>';		//처리일
				html += '   <td>' + menuInfo.empNm + '</td>';		//처리자
				if(menuInfo.dltF === 'N'){
					html += '  <td><input style="width:100%"  type="checkbox" checked></td>';
				} else {
					html += '  <td><input style="width:100%"  type="checkbox" ></td>';
				}
				html += '<tr></tr>';
				
			}
			
		} else {
			html += '<tr>';
			html += '	<td colspan="11" style="text-align: center">데이터가 없습니다.</td>';
			html += '</tr>';
		}
		
		$('#subMenuListTable').html(html);
		
	});
		

}

/* 상위메뉴 행추가 버튼 클릭*/
function addMenuRow(){
	var html ='';
	
		html += '<tr>';
		html += '	<td><input type="checkbox"></td>';		
		html += '	<td><input type="text" style="width: 100%;"></td>';	//메뉴ID
		html += '	<td><input type="text" style="width: 100%;"></td>'; 	//정렬번호
		html += '	<td><input type="text" style="width: 100%;"></td>';	//화면번호
		html += '	<td><input type="text"></td>';	//메뉴명
		html += '	<td><input type="text"></td>';	//메뉴설명
		html += '	<td><input type="text"  style="width: 100%;"></td>';	//URL분류코드
		html += '	<td></td>';	
		html += '	<td></td>';	
		html += '	<td></td>';	
		html += '</tr>';	
	$('#menuListTable').append(html);
	
}

/*상위메뉴 행삭제 버튼 클릭*/
function deleteMenuRow() {
	let mainList = new Array();
	let tr = $('#menuListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
		if (deleteCheckBox.is(":checked")) {
			mainList.push(deleteCheckBox.attr("id"));
		}
	}

	if (mainList.length != 0) {
		deleteMainMenu(mainList);
	}
}

/* 상위메뉴 행삭제 처리*/
var deleteMainMenu = function (mainList) {
	$.ajax({
		method: 'PATCH',
		url: '/deleteMainMenuInfo',
		data: JSON.stringify(mainList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			menuLoad();
		},
		error: function (response) {

		}
	});
}

/* 상위메뉴 저장 버튼 클릭*/
function clickSaveMainMenu() {
	let mainMenuList = new Array();

	let tr = $('#menuListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let mainMenu = new Object();

		let menuIdInput   	   = $(tr[i]).find("td:eq(1)").find("input");
		let srtNoInput    	   = $(tr[i]).find("td:eq(2)").find("input");
		let urlPrmtrCntntInput = $(tr[i]).find("td:eq(3)").find("input");
		let menuNmInput   	   = $(tr[i]).find("td:eq(4)").find("input");
		let shrtNmInput   	   = $(tr[i]).find("td:eq(5)").find("input");
		let urlDvdCdInput  	   = $(tr[i]).find("td:eq(6)").find("input");
		
		if (menuIdInput.length == 1) {
			if (menuIdInput.val().length > 8) {
				openPopup({title: '실패',text: '메뉴ID는 8자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							menuIdInput.focus();
						});
					}
				});
				return;
			} else if (!menuIdInput.val()) {
				openPopup({title: '실패',text: '메뉴ID를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							menuIdInput.focus();
						});
					}
				});
				return;
			}
			mainMenu.menuId = menuIdInput.val();
		}

		if (srtNoInput.length == 1) {
			if (srtNoInput.val().length > 5) {
				openPopup({title: '실패',text: '정렬번호는 5자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							srtNoInput.focus();
						});
					}
				});
				return;
			} else if (!srtNoInput.val()) {
				openPopup({title: '실패',text: '정렬번호를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							srtNoInput.focus();
						});
					}
				});
				return;
			}
			mainMenu.srtNo = srtNoInput.val();
		}

		if (urlPrmtrCntntInput.length == 1) {
			if (urlPrmtrCntntInput.val().length > 200) {
				openPopup({title: '실패',text: '화면번호는 200자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							urlPrmtrCntntInput.focus();
						});
					}
				});
				return;
			} else if (!urlPrmtrCntntInput.val()) {
				openPopup({title: '실패',text: '화면번호를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							urlPrmtrCntntInput.focus();
						});
					}
				});
				return;
			} 
				
			mainMenu.urlPrmtrCntnt = urlPrmtrCntntInput.val();
		}

		if (menuNmInput.length == 1) {
			if (menuNmInput.val().length > 50) {
				openPopup({title: '실패',text: '메뉴명은 50자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							menuNmInput.focus();
						});
					}
				});
				return;
			} else if (!menuNmInput.val()) {
				openPopup({title: '실패',text: '메뉴명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							menuNmInput.focus();
						});
					}
				});
				return;
			}
			mainMenu.menuNm = menuNmInput.val();
		}
		
		if (shrtNmInput.length == 1) {
			if (shrtNmInput.val().length > 100) {
				openPopup({title: '실패',text: '메뉴설명은 100자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							shrtNmInput.focus();
						});
					}
				});
				return;
			} else if (!shrtNmInput.val()) {
				openPopup({title: '실패',text: '메뉴설명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							shrtNmInput.focus();
						});
					}
				});
				return;
			}
			mainMenu.shrtNm = shrtNmInput.val();
		}
		
		if (urlDvdCdInput.length == 1) {
			if (urlDvdCdInput.val().length > 2) {
				openPopup({title: '실패',text: 'URL분류코드는 2자리 이하여야 합니다.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							urlDvdCdInput.focus();
						});
					}
				});
				return;
			} else if (!urlDvdCdInput.val()) {
				openPopup({title: '실패',text: 'URL분류코드를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							urlDvdCdInput.focus();
						});
					}
				});
				return;
			}
			mainMenu.urlDvdCd = urlDvdCdInput.val();
		}

		if (!(Object.keys(mainMenu).length === 0)) {
			mainMenu.oldMenuId = $(tr[i]).find("td:eq(0)").find("input").attr("id");
			mainMenuList.push(mainMenu);
		}
	}

	if (mainMenuList.length != 0) {
		saveMainMenu(mainMenuList);
	}
}

/*상위메뉴 저장 처리*/
var saveMainMenu = function (groupCodeList) {
	
	$.ajax({
		method: 'POST',
		url: '/registMainMenuInfo',
		data: JSON.stringify(groupCodeList),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: function () {
			menuLoad();
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

/*********************************************** */
/* 하위메뉴 행추가 버튼 클릭*/
function addSubMenuRow(){
	
	var html ='';
	
		html += '<tr>';
		html += '	<td><input type="checkbox"></td>';		
		html += '	<td><input type="text" style="width: 100%;"></td>';	//메뉴ID
		html += '	<td><input type="text" style="width: 100%;"></td>'; 	//정렬번호
		html += '	<td><input type="text" style="width: 100%;"></td>';	//화면번호
		html += '	<td><input type="text"></td>';	//메뉴명
		html += '	<td><input type="text"></td>';	//메뉴설명
		html += '	<td><input type="text"></td>';	//화면ID
		html += '	<td><input type="text"  style="width: 100%;"></td>';	//URL분류코드
		html += '	<td></td>';	
		html += '	<td></td>';	
		html += '	<td></td>';	
		html += '</tr>';	
	$('#subMenuListTable').append(html);
	
}

/*하위메뉴 행삭제 버튼 클릭*/
function deleteSubMenuRow() {
	let subMenuList = new Array();
	let tr = $('#subMenuListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
		if (deleteCheckBox.is(":checked")) {
			subMenuList.push(deleteCheckBox.attr("id"));
		}
	}

	if (subMenuList.length != 0) {
		deleteSubMenu(subMenuList);
	}
}

/* 하위메뉴 행삭제 처리*/
var deleteSubMenu = function (subMenuList) {
	$.ajax({
		method: 'PATCH',
		url: '/deleteSubMenuInfo',
		data: JSON.stringify(subMenuList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			menuLoad();
			getMenuIdInfo(menuId);
		},
		error: function (response) {

		}
	});
}

/*하위메뉴 저장 버튼 클릭*/
function clickSaveSubMenu() {
	let subMenuList = new Array();
	let tr = $('#subMenuListTable').children();
	for (let i = 0; i < tr.length; i++) {
		let subMenu = new Object();

		// TODO => 변수 할당 확인
		let mainMenuId = menuId;
		let oldSubMenuId 			= $(tr[i]).find("td:eq(0)").find("input").attr('id');
		let subMenuIdInput 		= $(tr[i]).find("td:eq(1)").find("input");
		let subSrtNoInput			= $(tr[i]).find("td:eq(2)").find("input");
		let subUrlPrmtrCntntInput	= $(tr[i]).find("td:eq(3)").find("input");
		let subMenuNmInput			= $(tr[i]).find("td:eq(4)").find("input");
		let subShrtNmInput			= $(tr[i]).find("td:eq(5)").find("input");
		let subUrlNmInput 			= $(tr[i]).find("td:eq(6)").find("input");
		let subUrlDvdCdInput 		= $(tr[i]).find("td:eq(7)").find("input");


		if (subMenuIdInput.length == 1) {
			if (!subMenuIdInput.val()) {
				openPopup({title: '실패',text: '메뉴ID를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subMenuIdInput.focus();
						});
					}
				});
				return;
			} else if (subMenuIdInput.val().length > 8) {
				openPopup({title: '실패',text: '코드는 8자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subMenuIdInput.focus();
						});
					}
				});
				return;
			}
			subMenu.menuId = subMenuIdInput.val();
		}

		if (subSrtNoInput.length == 1) {
			if (!subSrtNoInput.val()) {
				openPopup({title: '실패',text: '정렬번호를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subSrtNoInput.focus();
						});
					}
				});
				return;
			}else if (subSrtNoInput.val().length > 5) {
				openPopup({title: '실패',text: '정렬번호는 5자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subSrtNoInput.focus();
						});
					}
				});
				return;
			}
			subMenu.srtNo = subSrtNoInput.val();
		}
		
		if (subUrlPrmtrCntntInput.length == 1) {
			if (!subUrlPrmtrCntntInput.val()) {
				openPopup({title: '실패',text: '화면번호를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlPrmtrCntntInput.focus();
						});
					}
				});
				return;
			}else if (subUrlPrmtrCntntInput.val().length > 200) {
				openPopup({title: '실패',text: '화면번호는 200자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlPrmtrCntntInput.focus();
						});
					}
				});
				return;
			}
			subMenu.urlPrmtrCntnt = subUrlPrmtrCntntInput.val();
		}
		
		if (subMenuNmInput.length == 1) {
			if (!subMenuNmInput.val()) {
				openPopup({title: '실패',text: '메뉴명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subMenuNmInput.focus();
						});
					}
				});
				return;
			}else if (subMenuNmInput.val().length > 50) {
				openPopup({title: '실패',text: '메뉴명은 50자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subMenuNmInput.focus();
						});
					}
				});
				return;
			}
			subMenu.menuNm = subMenuNmInput.val();
		}
		
		if (subShrtNmInput.length == 1) {
			if (!subShrtNmInput.val()) {
				openPopup({title: '실패',text: '메뉴설명을 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subShrtNmInput.focus();
						});
					}
				});
				return;
			}else if (subShrtNmInput.val().length > 100) {
				openPopup({title: '실패',text: '메뉴설명은 100자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subShrtNmInput.focus();
						});
					}
				});
				return;
			}
			subMenu.shrtNm = subShrtNmInput.val();
		}
		
		if (subUrlNmInput.length == 1) {
			if (!subUrlNmInput.val()) {
				openPopup({title: '실패',text: '화면ID를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlNmInput.focus();
						});
					}
				});
				return;
			}else if (subUrlNmInput.val().length > 5) {
				openPopup({title: '실패',text: '화면ID는 5자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlNmInput.focus();
						});
					}
				});
				return;
			}
			subMenu.urlNm = subUrlNmInput.val();
		}
		
		if (subUrlDvdCdInput.length == 1) {
			if (!subUrlDvdCdInput.val()) {
				openPopup({title: '실패',text: 'URL분류코드를 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlDvdCdInput.focus();
						});
					}
				});
				return;
			}else if (subUrlDvdCdInput.val().length > 2) {
				openPopup({title: '실패',text: 'URL분류코드는 2자리 이하로 입력해주세요.',type: 'error',
					callback: function () {
						$(document).on('click', '.confirm', function () {
							subUrlDvdCdInput.focus();
						});
					}
				});
				return;
			}
			subMenu.urlDvdCd = subUrlDvdCdInput.val();
		}
		

		if (!(Object.keys(subMenu).length === 0)) {
			subMenu.oldSubMenuId = oldSubMenuId;
			subMenu.hgRnkMenuId = mainMenuId; //상위메뉴ID
			subMenuList.push(subMenu);
		}
	}

	if (subMenuList.length > 0) {
		saveSubMenu(subMenuList);
	}
}
/* 하위 메뉴 저장 처리*/
var saveSubMenu = function (subMenuList) {

	$.ajax({
		method: 'POST',
		url: '/registSubMenuInfo',
		data: JSON.stringify(subMenuList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function () {
			menuLoad();
			getMenuIdInfo(menuId);
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


