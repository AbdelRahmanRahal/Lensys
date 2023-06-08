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
	  const newElement = document.createElement('span'); // Create a new span element
  
	  // Apply syntax highlighting to the selected text
	  const codeElement = document.createElement('code');
	  codeElement.textContent = selectedText;
	  hljs.highlightElement(codeElement);
	  const preElement = document.createElement('pre');
	  preElement.appendChild(codeElement);
	  newElement.appendChild(preElement);
  
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


// Calling the function
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === 'editHighlightedText') {
		editHighlightedText();
	}
});