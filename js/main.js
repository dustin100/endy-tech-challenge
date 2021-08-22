document.addEventListener('DOMContentLoaded', function () {
	const popup = document.getElementById('popup');
	const bts = document.getElementById('back-to-shopping');
	const onClose = document.getElementById('close-popup');
	const mediaQuery = window.matchMedia('(min-width: 768px)');

	function onMouseOut(e) {
		// If the mouse is near the top of the window and media query is true, show the popup
		if (e.clientY < 5 && mediaQuery.matches) {
			// Remove this event listener so that it doesn't show again
			document.removeEventListener('mouseout', onMouseOut);
			// Show the popup
			popup.style.display = 'block';
			firstFocusableElement.focus();
			// assign event listener after displaying popup
			document.addEventListener('keydown', onExist);
			onClose.addEventListener('click', onExist);
			bts.addEventListener('click', onExist);
		}
	}
	// close popup
	function onExist(e) {
		if (e.code === 'Escape' || e.type === 'click') {
			popup.style.display = 'none';
			removeEventListener('keydown', onExist);
			removeEventListener('click', onExist);
		}
	}

	document.addEventListener('mouseout', onMouseOut);

	// This is to trap focus on the popup to ensure it is AODA compliant. I did not write this, but found it here: https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700

	// add all the elements inside modal which you want to make focusable
	const focusableElements =
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
	const modal = document.querySelector('#popup'); // select the modal by it's id

	const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
	const focusableContent = modal.querySelectorAll(focusableElements);
	const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

	document.addEventListener('keydown', function (e) {
		let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

		if (!isTabPressed) {
			return;
		}

		if (e.shiftKey) {
			// if shift key pressed for shift + tab combination
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus(); // add focus for the last focusable element
				e.preventDefault();
			}
		} else {
			// if tab key is pressed
			if (document.activeElement === lastFocusableElement) {
				// if focused has reached to last focusable element then focus first focusable element after pressing tab
				firstFocusableElement.focus(); // add focus for the first focusable element
				e.preventDefault();
			}
		}
	});
});
