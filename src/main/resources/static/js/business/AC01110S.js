$(document).ready(function() {
	
	setAC01130P();
	
});

function setAC01130P(){
	let Modal = document.getElementById('AC01130P');
	let OpenModal = document.getElementById("open_modal_AC01130P");
	let CloseModal1 = document.getElementsByClassName("modal_close_AC01130P")[0];
	
	OpenModal.onclick = function() {
	    Modal.style.display = "block";
	}
	
	CloseModal1.onclick = function() {
	    Modal.style.display = "none";
	}
	window.onclick = function(event) {
	    if (event.target === Modal) {
	        Modal.style.display = "none";
	    }
	}
}