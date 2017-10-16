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

function copyTitleAndUrlToClipboard(tab) {
    var content = createContent(tab.title, tab.url);
    copyToClipboard(content);
}

chrome.browserAction.onClicked.addListener(function(tab) {
    copyTitleAndUrlToClipboard(tab);
});

chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        copyTitleAndUrlToClipboard(tabs[0]);
    });
});
