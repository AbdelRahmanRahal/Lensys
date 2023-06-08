document.addEventListener('DOMContentLoaded', function () {
	const editButton = document.getElementById('editButton');
	if (editButton) {
		editButton.addEventListener('click', function () {
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { action: 'editHighlightedText' });
			});
		});
	} else {
		console.error('editButton not found');
	}
});


document.querySelector("#editButton").addEventListener("click", function() {
	if (!this.classList.contains("clicked")) {
		this.classList.add("clicked");
		this.classList.remove("clickedReverse");
		
		setTimeout(() => {
			this.classList.remove("clicked");
			this.classList.add("clickedReverse");
		}, 2000); // 2 seconds
	} else {
		this.classList.remove("clickedReverse");
		this.classList.add("clicked");
	}
});