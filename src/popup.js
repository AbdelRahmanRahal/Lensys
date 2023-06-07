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
