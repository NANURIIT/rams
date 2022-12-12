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

	var data = {
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
		data: data,
		dataType: "json",
		success: function(empList) {
			var a = '';
			$('#listContent').html(a);
			console.log(empList);
			//rebuildTable(empList);
		}
	});
	
}

function rebuildTable(empList){
	
};

