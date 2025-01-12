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

document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if(data.keywords) {
                    chrome.storage.sync.get({uploadedKeywords: []}, function(result) {
                        const existingKeywords = new Set([...result.uploadedKeywords, ...data.keywords]);
                        chrome.storage.sync.set({
                            uploadedKeywords: Array.from(existingKeywords),
                            uploadedFilename: file.name  // Explicitly save the filename
                        }, function() {
                            document.getElementById('filenameDisplay').textContent = file.name; // Update the filename display
                            document.getElementById('deleteFileBtn').style.display = 'inline'; // Show delete button
                            console.log('Uploaded keywords merged and filename saved successfully');
                        });
                    });
                } else {
                    console.error('No keywords array found in JSON file');
                }
            } catch (error) {
                console.error('Failed to parse JSON file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        console.error('No file selected');
    }
});

document.getElementById('deleteFileBtn').addEventListener('click', function() {
    chrome.storage.sync.set({uploadedKeywords: [], uploadedFilename: ''}, function() {
        console.log('Uploaded file and keywords deleted');
        document.getElementById('filenameDisplay').textContent = 'No file chosen';
        document.getElementById('deleteFileBtn').style.display = 'none'; // Hide delete button
    });
});

function addKeyword() {
    const keyword = document.getElementById('keyword').value.trim();
    if (keyword) {
        chrome.storage.sync.get({userKeywords: []}, function(result) {
            const keywords = new Set(result.userKeywords || []);
            if (!keywords.has(keyword)) {
                keywords.add(keyword);
                const updatedKeywords = Array.from(keywords);
                chrome.storage.sync.set({userKeywords: updatedKeywords}, function() {
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
    chrome.storage.sync.get({userKeywords: []}, function(result) {
        const updatedKeywords = result.userKeywords;
        updatedKeywords.splice(index, 1);
        chrome.storage.sync.set({userKeywords: updatedKeywords}, function() {
            displayKeywords(updatedKeywords); // Refresh display after deletion
        });
    });
}

document.getElementById('deleteAll').addEventListener('click', function() {
    chrome.storage.sync.set({userKeywords: []}, function() {
        console.log('All user keywords deleted');
        displayKeywords([]); // Clear display when all keywords are deleted
    });
});

// Load initial state of keywords and filter toggle when popup is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({userKeywords: [], 'filteringEnabled': true, 'uploadedFilename': ''}, function(result) {
        displayKeywords(result.userKeywords);
        document.getElementById('toggleFilter').checked = result.filteringEnabled;
        if (result.uploadedFilename) {
            document.getElementById('filenameDisplay').textContent = result.uploadedFilename;  // Set the file label if a filename is stored
            document.getElementById('deleteFileBtn').style.display = 'inline'; // Show delete button
        } else {
            document.getElementById('filenameDisplay').textContent = 'No file chosen';  // Default text if no filename is stored
            document.getElementById('deleteFileBtn').style.display = 'none'; // Hide delete button
        }
    });
});
