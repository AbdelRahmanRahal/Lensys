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
	this.classList.add("clicked");
  
	setTimeout(() => {
	  	this.classList.remove("clicked");
	}, 2000); // 2000 milliseconds (2 seconds)
});