$(document).ready(function() {

});

/* 메뉴명 조회 ( null 입력 시 전체 메뉴 조회 ) */
var AC01310S_findClickbutton = function(){
    let menuNm = $('#AC01310S_findMenu').val();
    
    $.ajax({
        url: '/findMenu',
        data: {"menuNm": menuNm},
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
        // html += '<input type="hidden" value="' + value.sq + '" />' // 권한 조회 할 pk 값..? 94B를 menu_id로 조회?
        html += '</tr>';
	})
    // console.log(html);
	$('#AC01310S_makeMenuList').html(html);

};

// 메뉴 권한 조회 ( 해당 메뉴의 'tr' 더블클릭 )
function selectMenuRow(e) {

    var menuId = $(e).find('td:eq(2)').html();

	// var sq = $(e).find('input').val();
	// var eno = $(e).find('td:eq(1)').html();
	// console.log("sq : " + sq + ", eno : " + eno);
	// selectAuthUser(sq, eno);

}

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

// search employee or deal
function keyDownEnter() {

	$("input[id=AC01310S_findMenu]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			makeMenuList();
		}
	});

}