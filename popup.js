document.getElementById('add').addEventListener('click', addKeyword);

document.getElementById('keyword').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addKeyword();  // Trigger addition when 'Enter' key is pressed
    }
});

document.getElementById('toggleFilter').addEventListener('change', function() {
    const isFilteringEnabled = this.checked;
    chrome.storage.sync.set({'filteringEnabled': isFilteringEnabled}, function() {
        console.log('Filtering is ' + (isFilteringEnabled ? 'enabled' : 'disabled'));
    });
});

function addKeyword() {
    const keyword = document.getElementById('keyword').value.trim();
    if (keyword) {
        chrome.storage.sync.get({keywords: []}, function(result) {
            const keywords = result.keywords || [];
            if (!keywords.includes(keyword)) {
                const updatedKeywords = [...keywords, keyword];
                chrome.storage.sync.set({keywords: updatedKeywords}, function() {
                    console.log('Keyword added: ' + keyword);
                    document.getElementById('keyword').value = ''; // Clear input field
                    displayKeywords(updatedKeywords); // Refresh keyword list display
                });
            }
        });
    }
}

function displayKeywords(keywords) {
    const listElement = document.getElementById('keywordsList');
    const deleteAllButton = document.getElementById('deleteAll');

    listElement.innerHTML = '';
    if (keywords.length === 0) {
        deleteAllButton.style.display = 'none';
    } else {
        deleteAllButton.style.display = 'block';
    }

    keywords.forEach(function(keyword, index) {
        const item = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = keyword;
        item.appendChild(text);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.className = 'deleteButton';
        deleteButton.dataset.index = index;
        deleteButton.onclick = function() {
            deleteKeyword(index);
        };
        item.appendChild(deleteButton);
        listElement.appendChild(item);
    });
}

function deleteKeyword(index) {
    chrome.storage.sync.get({keywords: []}, function(result) {
        const updatedKeywords = result.keywords;
        updatedKeywords.splice(index, 1);
        chrome.storage.sync.set({keywords: updatedKeywords}, function() {
            displayKeywords(updatedKeywords); // Refresh display after deletion
        });
    });
}

document.getElementById('deleteAll').addEventListener('click', function() {
    chrome.storage.sync.set({keywords: []}, function() {
        console.log('All keywords deleted');
        displayKeywords([]); // Clear display when all keywords are deleted
    });
});

// Load initial state of keywords and filter toggle when popup is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({keywords: [], 'filteringEnabled': true}, function(result) {
        displayKeywords(result.keywords);
        document.getElementById('toggleFilter').checked = result.filteringEnabled;
    });
});






// document.getElementById('add').addEventListener('click', addKeyword);

// document.getElementById('keyword').addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         addKeyword();  // Call the same function used by the 'Add' button
//     }
// });

// function addKeyword() {
//     const keyword = document.getElementById('keyword').value.trim();
//     if (keyword) {
//         chrome.storage.sync.get({keywords: []}, function(result) {
//             const keywords = result.keywords || [];
//             if (!keywords.includes(keyword)) { // Check if the keyword already exists to avoid duplicates
//                 const updatedKeywords = [...keywords, keyword];
//                 chrome.storage.sync.set({keywords: updatedKeywords}, function() {
//                     console.log('Keyword added: ' + keyword);
//                     document.getElementById('keyword').value = ''; // Clear input field
//                     displayKeywords(updatedKeywords); // Update UI
//                 });
//             }
//         });
//     }
// }


// function displayKeywords(keywords) {
//     const listElement = document.getElementById('keywordsList');
//     const deleteAllButton = document.getElementById('deleteAll');

//     listElement.innerHTML = ''; // Clear existing list
//     if (keywords.length === 0) {
//         deleteAllButton.style.display = 'none'; // Hide the button if no keywords
//     } else {
//         deleteAllButton.style.display = 'block'; // Show the button if there are keywords
//     }

//     keywords.forEach(function(keyword, index) {
//         const item = document.createElement('li');
//         const text = document.createElement('span');
//         text.textContent = keyword;
//         item.appendChild(text);

//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = '×'; // Using Unicode 'X' symbol
//         deleteButton.className = 'deleteButton';
//         deleteButton.dataset.index = index; // Store the index in the button
//         deleteButton.onclick = function() {
//             deleteKeyword(index);
//         };
//         item.appendChild(deleteButton);
//         listElement.appendChild(item);
//     });
// }

// function deleteKeyword(index) {
//     chrome.storage.sync.get({keywords: []}, function(result) {
//         const updatedKeywords = [...result.keywords];
//         updatedKeywords.splice(index, 1);
//         chrome.storage.sync.set({keywords: updatedKeywords}, function() {
//             displayKeywords(updatedKeywords); // Update UI
//         });
//     });
// }

// document.getElementById('deleteAll').addEventListener('click', function() {
//     chrome.storage.sync.set({keywords: []}, function() {
//         console.log('All keywords deleted');
//         displayKeywords([]); // Clear the display and hide the delete all button
//     });
// });

// // Initial display of keywords when popup is opened
// document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.sync.get({keywords: []}, function(result) {
//         displayKeywords(result.keywords);
//     });
// });
