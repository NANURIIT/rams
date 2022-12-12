$(document).ready(function($) {
	
	setAC01130P();
	setAC01121P();
	
});

function setAC01130P(){
	let Modal = document.getElementById('AC01130P');
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

function setAC01121P(){
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