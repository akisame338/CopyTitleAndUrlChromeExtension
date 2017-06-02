(function() {
    var textarea = document.createElement('textarea');
    textarea.id = 'textarea';
    document.body.appendChild(textarea);
}());

function createContent(title, url) {
    return `${title}\n${url}`;
}

function copyToClipboard(content) {
    var textarea = document.getElementById('textarea');
    textarea.value = content;
    textarea.select();
    document.execCommand('copy');
}

chrome.browserAction.onClicked.addListener(function(tab) {
    var content = createContent(tab.title, tab.url);
    copyToClipboard(content);
});
