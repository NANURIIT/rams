$(document).ready(function($) {
	
	setOpenModal();
	
	
	
});

function setOpenModal(){
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