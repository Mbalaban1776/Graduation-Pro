document.getElementById('add').addEventListener('click', function() {
    const keyword = document.getElementById('keyword').value;
    chrome.storage.sync.set({[keyword]: true}, function() {
        console.log('Keyword added: ' + keyword);
    });
});

document.getElementById('toggleFilter').addEventListener('change', function() {
    const isFiltering = this.checked;
    chrome.storage.sync.set({'filtering': isFiltering}, function() {
        console.log('Filtering is ' + (isFiltering ? 'enabled' : 'disabled'));
    });
});
