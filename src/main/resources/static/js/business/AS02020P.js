$(document).ready(function() {

	setOpenModal_AS02020P();

	setKeyDownFunction_AS02020P();

});

// modal controll function
function setOpenModal_AS02020P() {
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
		reset_AS02020P();
	}

	// close modal
	window.onclick = function(event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
			reset_AS02020P();
		}
	}

	// close modal
	$(document).keydown(function(e) {
		//keyCode 구 브라우저, which 현재 브라우저
		var code = e.keyCode || e.which;
		if (code == 27) { // 27은 ESC 키번호
			Modal.style.display = "none";
			reset_AS02020P();
		}
	});
};

function setKeyDownFunction_AS02020P() {
	keyDownEnter_AS02020P();
};

function keyDownEnter_AS02020P() {

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

};

function getDealInfo() {

	var dealNo = $("#AS02020P_dealNo").val();
	var dealNm = $("#AS02020P_dealNm").val();
	var dscDate = $("#AS02020P_datepicker1").val();

	var dtoParam = {
		"dealNo": dealNo
		, "dealNm": dealNm
		, "dscDate": dscDate
	};

	//console.log(dtoParam);

	$.ajax({
		type: "GET",
		url: "/getDealInfo",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var html = '';
			var empList = data;
			$('#AS02020P_dealInfoList').html(html);

			if (empList.length > 0) {
				$.each(empList, function(key, value) {
					//console.log(value);
					html += '<tr ondblclick="setDealInfo();">';
					html += '<td>' + value.IB_DEAL_NO + '</td>';
					html += '<td>' + value.IB_DEAL_NM + '</td>';
					html += '<td>' + value.DSC_DT + '</td>';
					html += '<td>' + value.DPRT_NM + '</td>';
					html += '<td>' + value.EMP_NM + '</td>';
					html += '<td>' + value.ENTP_RNM + '</td>';
					html += '</tr>';
				})
			} else {
				html += '<tr>';
				html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
			}
			//console.log(html);
			$('#AS02020P_dealInfoList').html(html);
		}
	});
};

// reset AC01120P
function reset_AS02020P() {
	$('#AS02020P_dealInfoList').html("");
	$('#AS02020P_dealNo').val("");
	$('#AS02020P_dealNm').val("");
	$('#AS02020P_datepicker1').val("");
};

// close modal
function modalClose_AS02020P() {
	let Modal = document.getElementById('AS02020P');
	Modal.style.display = "none";
};

// 팝업에서 deal 번호 조회후 더블클릭
function setDealInfo() {
	//tr(selected) = event.currentTarget;
	//td(selected) = event.target;
	var tr = event.currentTarget;
	var td = $(tr).children();
	var ibDealNo = td.eq(0).text();

	//console.log(ibDealNo);
	
	$('#AS03210S_ibDealNo').val(ibDealNo);
	
	reset_AS02020P();
	modalClose_AS02020P();
};
