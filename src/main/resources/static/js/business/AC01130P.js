$(document).ready(function($) {
    
    setAC01121P();
	
});

function setAC01121P(){
	getEnoList();
	let Modal = document.getElementById('AC01121P');
	let OpenModal = document.getElementById("open_modal2");
	let CloseModal = document.getElementsByClassName("modal_close2")[0];
	
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
let setEno = function(eno) {
	console.log(typeof(eno))
	$('#setEno').html(eno);
	$('#AC01121P').css('display', 'none');
}

let getEnoList = function () {
    $.ajax({
        url: '/getEnoList',
        method: 'GET',
        dataType: 'json'
    }).done(function (userInfo) {
        let userInfoHTML = '';
        for (idx in userInfo) {
			let row = userInfo[idx];
			let stringEno = row.eno + "";
			console.log(stringEno);
            userInfoHTML += '<tr><td>' + stringEno + '<button onclick="setEno('+ stringEno +');">선택</button></td><td>'+ row.empNm +'</td></tr>';
        }
        $('#userInfo').append(userInfoHTML);
    });
}




