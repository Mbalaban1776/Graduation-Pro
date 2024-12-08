chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
        hideContentBasedOnKeywords(result.keywords);
    }
});

function hideContentBasedOnKeywords(keywords) {
    // Normalize keywords for case-insensitive comparison
    keywords = keywords.map(keyword => keyword.toLowerCase());

    // First, handle general text-containing elements
    const textElements = document.querySelectorAll('p, li, a, span, img');
    textElements.forEach(element => {
        const textContent = element.textContent.toLowerCase();
        const altText = element.alt ? element.alt.toLowerCase() : ""; // Check alt text for images
        keywords.forEach(keyword => {
            if (textContent.includes(keyword) || altText.includes(keyword)) {
                element.style.display = 'none'; // Hide elements containing the keyword
            }
        });
    });

    // Secondly, specifically handle div elements that contain headers with keywords
    const headers = document.querySelectorAll('div h1, div h2, div h3, div h4, div h5, div h6');
    headers.forEach(header => {
        const headerText = header.textContent.toLowerCase();
        keywords.forEach(keyword => {
            if (headerText.includes(keyword)) {
                const parentDiv = header.closest('div'); // Get the closest parent div of the header
                if (parentDiv) {
                    parentDiv.style.display = 'none'; // Hide the whole div if any header contains a keyword
                }
            }
        });
    });
}

// Optional: MutationObserver to handle dynamic content updates
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(newNode => {
            if (newNode.nodeType === 1) { // Element node
                chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
                    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
                        hideContentBasedOnKeywords(result.keywords);
                    }
                });
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true, characterData: false });






