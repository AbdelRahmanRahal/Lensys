function getSelectedText() {
	let selectedText = '';
	if (window.getSelection) {
		selectedText = window.getSelection().toString();
	} else if (document.selection && document.selection.type !== 'Control') {
		selectedText = document.selection.createRange().text;
	}
	return selectedText;
}
  
function editHighlightedText() {
	const selectedText = getSelectedText();
	if (selectedText) {
		const newElement = document.createElement('span'); // Create a new span element
		newElement.innerHTML = '<pre><code>' + selectedText + '</code></pre>'; // Prompt the user to enter new HTML content for the span element
		if (newElement.innerHTML) { // If the user entered new HTML content, execute the following code block
			const selection = window.getSelection();
			if (selection.rangeCount) {
				const range = selection.getRangeAt(0);
				range.deleteContents();
				range.insertNode(newElement); // Insert the new span element into the range
				range.setStartAfter(newElement);
				selection.removeAllRanges();
			}
		}
	}
}
  
  
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'editHighlightedText') {
		editHighlightedText();
	}
});