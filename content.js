

chrome.storage.sync.get(['keywords', 'filteringEnabled'], function(result) {
    if (result.filteringEnabled && result.keywords && result.keywords.length > 0) {
        const currentUrl = window.location.href;

        if (currentUrl.startsWith('https://www.youtube.com')) {
            hideYouTubeContent(result.keywords);
        } else if (currentUrl.startsWith('https://eksisozluk.com')) {
            hideContentEksiSozluk(result.keywords);
        } else if (currentUrl.includes('https://www.google.')) {
            hideGoogleSearchContent(result.keywords);
        }
    }
});



function hideYouTubeContent(keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());

    const videoItems = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer');
    videoItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        if (titleElement && keywords.some(keyword => titleElement.textContent.toLowerCase().includes(keyword))) {
            item.style.display = 'none'; // Hide the video item
        }
    });

    const comments = document.querySelectorAll('ytd-comment-thread-renderer');
    comments.forEach(comment => {
        const commentText = comment.querySelector('yt-attributed-string');
        if (commentText && keywords.some(keyword => commentText.textContent.toLowerCase().includes(keyword))) {
            comment.style.display = 'none'; // Hide the comment thread
        }
    });
}

function hideContentEksiSozluk(keywords) {
    keywords = keywords.map(keyword => keyword.toLowerCase());

    const generalElements = document.querySelectorAll('p, li, a, span, img');
    generalElements.forEach(element => {
        const textContent = element.textContent.toLowerCase();
        const altText = element.alt ? element.alt.toLowerCase() : "";
        keywords.forEach(keyword => {
            if (textContent.includes(keyword) || altText.includes(keyword)) {
                element.style.display = 'none';
            }
        });
    });

    const headers = document.querySelectorAll('div h1, div h2, div h3, div h4, div h5, div h6');
    headers.forEach(header => {
        const headerText = header.textContent.toLowerCase();
        keywords.forEach(keyword => {
            if (headerText.includes(keyword)) {
                const parentDiv = header.closest('div');
                if (parentDiv) {
                    parentDiv.style.display = 'none';
                }
            }
        });
    });

    const contentDivs = document.querySelectorAll('.topic-item .content');
    contentDivs.forEach(contentDiv => {
        const textContent = contentDiv.textContent.toLowerCase();
        keywords.forEach(keyword => {
            if (textContent.includes(keyword)) {
                const topicItem = contentDiv.closest('.topic-item');
                if (topicItem) {
                    topicItem.style.display = 'none';
                }
            }
        });
    });
}

function hideGoogleSearchContent(keywords) {

    keywords = keywords.map(keyword => keyword.trim().toLowerCase());
   

    // Handle .MjjYud containers
    const mjjYudResults = document.querySelectorAll('.MjjYud');
    mjjYudResults.forEach(result => {
        let shouldHide = false;

        const titleElement = result.querySelector('h3.LC20lb');
        const emTags = result.querySelectorAll('div.VwiC3b span , div.p4wth'); // Specific selector for em tags

        if (titleElement && keywords.some(keyword => titleElement.textContent.toLowerCase().includes(keyword))) {
            shouldHide = true;
        }

        emTags.forEach(em => {
            if (keywords.some(keyword => em.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
    });

    // Handle .uEierd containers for ads
    const adResults = document.querySelectorAll('.uEierd');
    adResults.forEach(result => {
        let shouldHide = false;

        const adSpans = result.querySelectorAll('a.sVXRqc span , div.p4wth'); // Specific selector for ad spans

        adSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
    });

    const adImages =document.querySelectorAll('.XRVJtc');
    adImages.forEach(result => {
        let shouldHide = false;
        const adSpans = result.querySelectorAll('span.Yt787'); // Specific selector for ad spans
        adSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }

    });

    const subImages =document.querySelectorAll('.vCUuC');
    subImages.forEach(result => {
        let shouldHide = false;
        const subSpans = result.querySelectorAll('div.yVCOtc'); // Specific selector for ad spans
        subSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }

    });

    const images =document.querySelectorAll('.eA0Zlc');
    images.forEach(result => {
        let shouldHide = false;
        const imageSpans = result.querySelectorAll('div.JMWMJ div.toI8Rb'); // Specific selector for ad spans
        imageSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
        
    });

    const seaches =document.querySelectorAll('.b2Rnsc');
    seaches.forEach(result => {
        let shouldHide = false;
        const searchSpans = result.querySelectorAll('div.mtv5bd span'); // Specific selector for ad spans
        searchSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
        
    });

    const alsoAsk =document.querySelectorAll('div[jsname="yEVEwb"]');
    alsoAsk.forEach(result => {
        let shouldHide = false;
        const askSpans = result.querySelectorAll('span.CSkcDe'); // Specific selector for ad spans
        askSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
        
    });


    const subVideos =document.querySelectorAll('.sHEJob');   
    subVideos.forEach(result => {
        let shouldHide = false;
        const subVideoSpans = result.querySelectorAll('div.y05Tsc'); // Specific selector for ad spans
        subVideoSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
        }
        
    });

    

    const videos=document.querySelectorAll('.PmEWq');
    videos.forEach(result => {
        let shouldHide = false;
        const videoSpans = result.querySelectorAll('h3.LC20lb,div.ITZIwc'); // Specific selector for ad spans
        videoSpans.forEach(span => {
            if (keywords.some(keyword => span.textContent.toLowerCase().includes(keyword))) {
                shouldHide = true;
            }
        });

        if (shouldHide) {
            result.style.display = 'none';
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
                        if (currentUrl.startsWith('https://www.youtube.com')) {
                            hideYouTubeContent(result.keywords);
                        } else if (currentUrl.startsWith('https://eksisozluk.com')) {
                            hideContentEksiSozluk(result.keywords);
                        } else if (currentUrl.includes('https://www.google.')) {
                            hideGoogleSearchContent(result.keywords);
                        }
                    }
                });
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true, characterData: false });
