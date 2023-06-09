// Injects styles into the page
function injectStyles(rule) {
	const div = document.createElement('div');
	div.innerHTML = `<style>${rule}</style>`;
	document.body.appendChild(div);
}


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
		const newElement = document.createElement('span');
		
		// Applying syntax highlighting to the selected text
		const codeElement = document.createElement('code');
		codeElement.textContent = selectedText;
		hljs.highlightElement(codeElement);
		
		// Adding a copy code button
		const copyButtonElement = document.createElement('button');
		copyButtonElement.classList.add('copy-button');
		copyButtonElement.setAttribute('type', 'button');
		copyButtonElement.textContent = 'Copy Code';
		copyButtonElement.addEventListener('click', () => {
			copyCodeToClipboard(codeElement); 
		});
		
		// Injecting the style for the copy code button
		injectStyles(`
		.copy-button {
			background-color: #0d1117;
			color: #ffffff;
			border: none;
			padding: 5px 10px;
			font-size: 0.8rem;
			cursor: pointer;
			margin-left: 5px;
			}
			
			
			.copy-button:hover {
				background-color: #2e2e37;
			}
		`);


		// Ingulfing it in a <pre> element
		const preElement = document.createElement('pre');
		preElement.appendChild(codeElement);
		preElement.appendChild(copyButtonElement);
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