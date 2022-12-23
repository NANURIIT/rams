$(document).ready(function() {
	
	setOpenModal();
	
	setKeyDownFunction();
	
});

// modal controll function
function setOpenModal() {
	let Modal = document.getElementById('AC01120P');
	let OpenModal = document.getElementById("open_modal_AC01120P");
	let CloseModal = document.getElementsByClassName("modal_close_AC01120P")[0];
	
	// open modal
	OpenModal.onclick = function() {
		Modal.style.display = "block";
	}

	// close modal
	CloseModal.onclick = function() {
		Modal.style.display = "none";
		reset_AC01120P();
	}
	
	// close modal
	window.onclick = function(event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
			reset_AC01120P();
		}
	}

	// close modal
	$(document).keydown(function(e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
			reset_AC01120P();
		}

	});

}

// reset AC01120P
function reset_AC01120P() {
	$('#AC01120P_tbodyEmpList').html("");
	$('#AC01120P_empNm').val("");
	$('#AC01120P_eno').val("");
	$('#AC01120P_dprtCd').val("");
	$('#AC01120P_dprtNm').val("");
}

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

// search employee or deal
function keyDownEnter() {

	$("input[id=AC01120P_empNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_eno]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_dprtCd]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_dprtNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});
}

// get employee list
function getEmpList() {

	var empNm = $("#AC01120P_empNm").val();
	var eno = $("#AC01120P_eno").val();
	var dprtCd = $("#AC01120P_dprtCd").val();
	var dprtNm = $("#AC01120P_dprtNm").val();

	var dtoParam = {
		"empNm": empNm
		, "eno": eno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	//console.log(data);

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var a = '';
			$('#AC01120P_tbodyEmpList').html(a);
			//console.log(data);
			rebuildTable(data);
		}
	});

}

// draw modal table employee 
function rebuildTable(data) {
	var html = '';
	var empList = data;

	if (empList.length > 0) {
		$.each(empList, function(key, value) {
			//console.log(value);
			html += '<tr onclick="setEmpNm();">';
			html += '<td>' + value.ENO + '</td>';
			html += '<td>' + value.EMP_NM + '</td>';
			html += '<td>' + value.DPRT_CD + '</td>';
			html += '<td>' + value.DPRT_NM + '</td>';
			html += '<td>' + value.HDQT_CD + '</td>';
			html += '<td>' + value.HDQT_NM + '</td>';
			html += '</tr>';
		})
	} else {
		html += '<tr>';
		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	}
	//console.log(html);
	$('#AC01120P_tbodyEmpList').html(html);

};

// close modal
function modalClose(){
	let Modal = document.getElementById('AC01120P');
	Modal.style.display = "none";
}

// send to #rcvdEmpNm
function setEmpNm(){
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	var tr = event.currentTarget;
	var td = $(tr).children();
	
	var empNo = td.eq(0).text();	// 직원번호
	var empNm = td.eq(1).text();	// 직원명
	var dprtCd = td.eq(2).text();	// 부점코드
	var dprtNm = td.eq(3).text();	// 부점명
	var hdqtCd = td.eq(4).text();	// 본부코드
	var hdqtNm = td.eq(5).text();	// 본부명
	
	
	var pathname = $(location).attr('pathname');
	var path = pathname.split('/');
	var pageEmpNm = '#' + path[path.length - 1] + '_empNm';
	var pageEmpNo = '#' + path[path.length - 1] + '_empNo';
	var pageDprtCd = '#' + path[path.length - 1] + '_dprtCd';
	var pageDprtNm = '#' + path[path.length - 1] + '_dprtNm';
	var pageHdqtCd = '#' + path[path.length - 1] + '_hdqtCd';
	var pageHdqtNm = '#' + path[path.length - 1] + '_hdqtNm';
	
	$(pageEmpNm).val(empNm);
	$(pageEmpNo).val(empNo);
	$(pageDprtCd).val(dprtCd);
	$(pageDprtNm).val(dprtNm);
	$(pageHdqtCd).val(hdqtCd);
	$(pageHdqtNm).val(hdqtNm);
	
	reset_AC01120P();
	modalClose();
}


