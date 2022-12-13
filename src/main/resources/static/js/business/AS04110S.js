$(document).ready(function() {
	
	setOpenModal();
	
});

function setOpenModal(){
	let Modal = document.getElementById('AS04120P');
	let OpenModal = document.getElementById("open_modal_AS04120P");
	let CloseModal = document.getElementsByClassName("modal_close_AS04120P")[0];
	
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