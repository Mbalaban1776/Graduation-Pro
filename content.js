chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
        filterContent(result.keywords);
    }
});

function filterContent(keywords) {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a'); // Target text-containing elements
    elements.forEach(el => {
        keywords.forEach(keyword => {
            if (el.textContent.includes(keyword)) {
                el.style.display = 'none'; // Hides elements containing the keyword
            }
        });
    });
}
