$(document).ready(function() {
	
	setOpenModal();
	
	setKeyDownFunction();
	
});

// modal controll function
function setOpenModal(){
	let Modal = document.getElementById('AS02020P');
	let OpenModal = document.getElementById("open_modal_AS02020P");
	let CloseModal = document.getElementsByClassName("modal_close_AS02020P")[0];
	
	// open modal
	OpenModal.onclick = function() {
	    Modal.style.display = "block";
	}
	
	// close modal
	CloseModal.onclick = function() {
	    Modal.style.display = "none";
	}
	
	// close modal
	window.onclick = function(event) {
	    if (event.target === Modal) {
	        Modal.style.display = "none";
	    }
	}
	
	// close modal
	$(document).keydown(function(e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
		}

	});
}

// when page loaded
function setKeyDownFunction() {
	keyDownEnter();
}

function getDealInfo(){
	
	var dealNo = $("#AS02020P_dealNo").val();
	var dealNm = $("#AS02020P_dealNm").val();
	var dscDate = $("#AS02020P_datepicker1").val();
	
	var dtoParam = {
		"dealNo" : dealNo
		, "dealNm" : dealNm
		, "dscDate" : dscDate
	}
	
	//console.log(dtoParam);
	
	$.ajax({
		type: "GET",
		url: "/getDealList",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			
			console.log(data);
			/* 
			var a = '';
			$('#tbodyEmpList').html(a);
			
			rebuildTable(data);
			 */
			
		
		}
	});
		
}

function keyDownEnter() {

	$("input[id=AS02020P_dealNo]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});
	
	$("input[id=AS02020P_dealNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});
	
	$("input[id=AS02020P_datepicker1]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getDealInfo();
		}
	});

} 

