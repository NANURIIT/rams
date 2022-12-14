$(document).ready(function () {

	setAC01121P();
	setDatePicker();

	$('#saveButton').on('click', function () {
		saveUserData();
	});

});

function setDatePicker() {

	// settings
	$('.datepicker').daterangepicker({
		singleDatePicker: true,
		autoUpdateInput: false,
		autoApply: false,
		locale: {
			"cancelLabel": 'Clear',
			"format": 'YYYY-MM-DD',
			"daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
			"monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
		}
	});

	// btn apply
	$('.datepicker').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('YYYY-MM-DD'));
	});

	// btn clear
	$('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});

}

function setAC01121P() {
	let Modal = document.getElementById('AC01121P');
	let OpenModal = document.getElementById("open_modal_AC01121P");
	let CloseModal = document.getElementsByClassName("modal_close_AC01121P")[0];
	
	OpenModal.onclick = function () {
		getEnoList();
		Modal.style.display = "block";
	}

	CloseModal.onclick = function () {
		Modal.style.display = "none";
	}
	window.onclick = function (event) {
		if (event.target === Modal) {
			Modal.style.display = "none";
		}
	}
}
let setEno = function (eno) {
	$('#setEno').text(eno);
	$('#AC01121P').css('display', 'none');
}

var getEnoList = function () {

	/* 사원번호 조회 선택 후 AC01130P 해당 항목에 입력 */
	$.ajax({
		url: '/getEnoList',
		method: 'GET',
		dataType: 'json',
		// data: dtoParam,
	}).done(function (userInfo) {
		let userInfoHTML = '';
		for (idx in userInfo) {
			let row = userInfo[idx];
			//console.log(stringEno);
			userInfoHTML += '<tr><td>' + row.eno + '<button onclick="setEno(' + "'" + row.eno + "'" + ');">선택</button></td><td>' + row.empNm + '</td></tr>';
		}
		$('#userInfo').html(userInfoHTML);
	});
}

var saveUserData = function () {

	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();
	let day = today.getDay();

	let eno = $('#setEno').text();
	let empNm = $('#empNm').val();
	let rghtCd = $('#rghtCd option:selected').val();
	let aplcStrtDt = $('#AC01130P_datepicker1').val();
	let aplcEndDt = $('#AC01130P_datepicker2').val();
	let rgstRsn = $('#rgstRsn').val();
	let rgstPEno = $('#rgstPEno').val();		/* 등록자는 로그인 한 사원의 세션 */
	let rgstDt = year + month + day;			/* 8자리의 날짜 */
	let hndlPEno = $('#hndlPEno').val();		/* 수정자의 세션 */
	let hndlDyTm = today; 						/* 수정한 시간(Date타입) */

	let dtoParam = {
		"usrC": null
		, "eno": eno
		, "empNm": empNm
		, "pstn": null
		, "rghtCd": rghtCd
		, "rgstRsn": rgstRsn
		, "aplcStrtDt": aplcStrtDt
		, "aplcEndDt": aplcEndDt
		, "rgstPEno": rgstPEno
		, "rgstDt": rgstDt
		, "hndlPEno": hndlPEno
		, "hndlDyTm": hndlDyTm
	}

    $.ajax({
        method : 'POST', 
        url : '/insertUser', 
        data : JSON.stringify(dtoParam), 
        contentType: "application/json; charset=UTF-8", 
        dataType: 'json',
        success : function(data) {
			console.log("Data Commit Completed");
			console.log(data);
        }, 
        error: function(response) {
            let message = response.responseJSON;
			console.log(response);
			console.log(message);
            alert(message);
        }
    });
}



