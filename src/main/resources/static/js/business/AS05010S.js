$(document).ready(function($) {

	setOpenModal();

	//getEmpList();

});

function setOpenModal() {
	let Modal = document.getElementById('AC01120P');
	let OpenModal = document.getElementById("open_modal");
	let CloseModal = document.getElementsByClassName("modal_close")[0];

	OpenModal.onclick = function() {
		Modal.style.display = "block";
	}

	CloseModal.onclick = function() {
		Modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
		}
	}
}

function getEmpList() {

	var empNm = $("#empNm").val();
	var eno = $("#eno").val();
	var dprtCd = $("#dprtCd").val();
	var dprtNm = $("#dprtNm").val();

	var dtoParam = {
		"empNm": empNm
		, "eno": eno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}

	//alert(data);
	//console.log(data);

	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function(data) {
			var a = '';
			$('#tbodyEmpList').html(a);
			//console.log(data);
			rebuildTable(data);
		}
	});

}

function rebuildTable(data) {
	var html = '';
	var empList = data;

	if (empList.length > 0) {
		$.each(empList, function(key, value) {
			console.log(value);
			html += '<tr>';
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
	console.log(html);
	$('#tbodyEmpList').html(html);

};

