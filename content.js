// chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
//     if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
//         const currentUrl = window.location.href;

//         if (currentUrl.startsWith('https://www.youtube.com')) {
//             hideYouTubeContent(result.keywords);
//         } else if (currentUrl.startsWith('https://eksisozluk.com')) {
//             hideContentEksiSozluk(result.keywords);
//         }
//     }
// });

// function hideYouTubeContent(keywords) {
//     keywords = keywords.map(keyword => keyword.toLowerCase());

//     const videoItems = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer,yt-lockup-view-model');
//     videoItems.forEach(item => {
//         const titleElement = item.querySelector('h3');
//         if (titleElement && keywords.some(keyword => titleElement.textContent.toLowerCase().includes(keyword))) {
//             item.style.display = 'none'; // Hide the video item
//         }
//     });

//     const comments = document.querySelectorAll('ytd-comment-thread-renderer');
//     comments.forEach(comment => {
//         const commentText = comment.querySelector('yt-attributed-string');
//         if (commentText && keywords.some(keyword => commentText.textContent.toLowerCase().includes(keyword))) {
//             comment.style.display = 'none'; // Hide the comment thread
//         }
//     });
// }

// function hideContentEksiSozluk(keywords) {
//     // Normalize keywords for case-insensitive comparison
//     keywords = keywords.map(keyword => keyword.toLowerCase());

//     // Handle general text-containing elements
//     const generalElements = document.querySelectorAll('p, li, a, span, img');
//     generalElements.forEach(element => {
//         const textContent = element.textContent.toLowerCase();
//         const altText = element.alt ? element.alt.toLowerCase() : ""; // Check alt text for images
//         keywords.forEach(keyword => {
//             if (textContent.includes(keyword) || altText.includes(keyword)) {
//                 element.style.display = 'none'; // Hide elements containing the keyword
//             }
//         });
//     });

//     // Specifically handle headers within div elements
//     const headers = document.querySelectorAll('div h1, div h2, div h3, div h4, div h5, div h6');
//     headers.forEach(header => {
//         const headerText = header.textContent.toLowerCase();
//         keywords.forEach(keyword => {
//             if (headerText.includes(keyword)) {
//                 const parentDiv = header.closest('div');
//                 if (parentDiv) {
//                     parentDiv.style.display = 'none';
//                 }
//             }
//         });
//     });

//     // Target .topic-item divs based on .content child
//     const contentDivs = document.querySelectorAll('.topic-item .content');
//     contentDivs.forEach(contentDiv => {
//         const textContent = contentDiv.textContent.toLowerCase();
//         keywords.forEach(keyword => {
//             if (textContent.includes(keyword)) {
//                 const topicItem = contentDiv.closest('.topic-item');
//                 if (topicItem) {
//                     topicItem.style.display = 'none'; // Hide the whole topic-item div
//                 }
//             }
//         });
//     });
// }


// const observer = new MutationObserver(mutations => {
//     mutations.forEach(mutation => {
//         mutation.addedNodes.forEach(newNode => {
//             if (newNode.nodeType === 1) {
//                 chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
//                     if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
//                         const currentUrl = window.location.href;
//                         if (currentUrl.startsWith('https://www.youtube.com')) {
//                             hideYouTubeContent(result.keywords);
//                         } else if (currentUrl.startsWith('https://eksisozluk.com')) {
//                             hideContentEksiSozluk(result.keywords);
//                         }
//                     }
//                 });
//             }
//         });
//     });
// });

// observer.observe(document.body, { childList: true, subtree: true, characterData: false });


chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
        const currentUrl = window.location.href;

        if (currentUrl.includes('https://www.google.')) {
            hideGoogleSearchContent(result.keywords);
        } else if (currentUrl.startsWith('https://www.youtube.com')) {
            hideYouTubeContent(result.keywords);
        } else if (currentUrl.startsWith('https://eksisozluk.com')) {
            hideContentEksiSozluk(result.keywords);
        }
    }
});

function hideGoogleSearchContent(keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());

    const searchResults = document.querySelectorAll('.hlcw0c');
    searchResults.forEach(result => {
        const emTags = result.querySelectorAll('span em');
        emTags.forEach(em => {
            if (keywords.some(keyword => em.textContent.toLowerCase().includes(keyword))) {
                result.style.display = 'none';
            }
        });
    });
}

function hideYouTubeContent(keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());

    const videoItems = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer');
    videoItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        if (titleElement && keywords.some(keyword => titleElement.textContent.toLowerCase().includes(keyword))) {
            item.style.display = 'none';
        }
    });

    const comments = document.querySelectorAll('ytd-comment-thread-renderer');
    comments.forEach(comment => {
        const commentText = comment.querySelector('yt-attributed-string');
        if (commentText && keywords.some(keyword => commentText.textContent.toLowerCase().includes(keyword))) {
            comment.style.display = 'none';
        }
    });
}

function hideContentEksiSozluk(keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());

    const contentDivs = document.querySelectorAll('.topic-item .content');
    contentDivs.forEach(contentDiv => {
        const textContent = contentDiv.textContent.toLowerCase();
        if (keywords.some(keyword => textContent.includes(keyword))) {
            const topicItem = contentDiv.closest('.topic-item');
            if (topicItem) {
                topicItem.style.display = 'none';
            }
        }
    });
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(newNode => {
            if (newNode.nodeType === 1) {
                chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
                    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
                        const currentUrl = window.location.href;
                        if (currentUrl.includes('https://www.google.')) {
                            hideGoogleSearchContent(result.keywords);
                        } else if (currentUrl.startsWith('https://www.youtube.com')) {
                            hideYouTubeContent(result.keywords);
                        } else if (currentUrl.startsWith('https://eksisozluk.com')) {
                            hideContentEksiSozluk(result.keywords);
                        }
                    }
                });
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true, characterData: false });
