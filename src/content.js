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
		// Creating a span element to contain everything we edit
		const codeBlockWrapper = document.createElement('span');
		codeBlockWrapper.classList.add('lensys-wrapper');
		
		// Applying syntax highlighting to the selected text
		const codeElement = document.createElement('code');
		codeElement.textContent = selectedText;
		hljs.highlightElement(codeElement);
		
		// Creating a span element to contain the copy button
		const copyButtonWrapper = document.createElement('span');
		copyButtonWrapper.classList.add('lensys-copy-button-wrapper');
		// Creating  a "copy code" button
		const copyButton = document.createElement('button');
		copyButton.setAttribute('type', 'button');
		copyButton.setAttribute('name', 'Copy Code');
		copyButton.classList.add('lensys-copy-button');
		copyButton.addEventListener('click', () => {
			copyCodeToClipboard(codeElement); 
		});

		// Creating an img element for the clipboard icon for the copy button
		const clipboardImg = document.createElement('img');
		const svgPath = chrome.runtime.getURL('icons/clipboard.svg');
		clipboardImg.setAttribute('src', svgPath);
		clipboardImg.setAttribute('alt', 'Copy Code');
		clipboardImg.classList.add('lensys-copy-button-img')
		
		// Appending the img element to the copyButton
		copyButton.appendChild(clipboardImg);
		copyButtonWrapper.appendChild(copyButton);
		// Wrapping the code block in a pre element and finally wrapping everything the original span element
		const preElement = document.createElement('pre');
		preElement.appendChild(codeElement);
		preElement.appendChild(copyButtonWrapper);
		codeBlockWrapper.appendChild(preElement);


		if (codeBlockWrapper.innerHTML) {
			const selection = window.getSelection();
			if (selection.rangeCount) {
				const range = selection.getRangeAt(0);
				// Clearing the selected content and inserting the new span element into the range
				range.deleteContents();
				range.insertNode(codeBlockWrapper);
				range.setStartAfter(codeBlockWrapper);
				selection.removeAllRanges();
			}
		}
	}
}


// Copies the contents of the code blocks
function copyCodeToClipboard(codeElement) {
	const text = codeElement.textContent;
	navigator.clipboard.writeText(text)
		.then(() => {
			alert('Code copied to clipboard!');
		})
		.catch((error) => {
			console.error('Failed to copy code: ', error);
		});
}


// Calling the function
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === 'editHighlightedText') {
		editHighlightedText();
	}
});