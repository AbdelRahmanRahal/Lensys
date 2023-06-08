// Returns text selected by the user
function getSelectedText() {
	let selectedText = '';
	if (window.getSelection) {
		selectedText = window.getSelection().toString();
	} else if (document.selection && document.selection.type !== 'Control') {
		selectedText = document.selection.createRange().text;
	}
	return selectedText;
}


// Turns text selected by the user into code blocks with syntax highlight
function editHighlightedText() {
	const selectedText = getSelectedText();
	if (selectedText) {
		// Creating a new span element to contain everything we edit
		const newElement = document.createElement('span'); // Create a new span element

		// Applying syntax highlighting to the selected text
		const codeElement = document.createElement('code');
		codeElement.textContent = selectedText;
		hljs.highlightElement(codeElement);

		// Ingulfing it in a <pre> element
		const preElement = document.createElement('pre');
		preElement.appendChild(codeElement);
		newElement.appendChild(preElement);

		if (newElement.innerHTML) {
			const selection = window.getSelection();
			if (selection.rangeCount) {
				const range = selection.getRangeAt(0);
				// Clearing the selected content and inserting the new span element into the range
				range.deleteContents();
				range.insertNode(newElement);
				range.setStartAfter(newElement);
				selection.removeAllRanges();
			}
		}
	}
}


// Calling the function
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === 'editHighlightedText') {
		editHighlightedText();
	}
});