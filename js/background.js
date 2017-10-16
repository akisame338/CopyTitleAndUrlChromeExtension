(function() {
    var textarea = document.createElement('textarea');
    textarea.id = 'textarea';
    document.body.appendChild(textarea);
}());

/**
 * クリップボードにコピーする内容を生成
 *
 * @param  {String} title ページのタイトル
 * @param  {String} url   ページのURL
 * @return {String} クリップボードにコピーする内容
 */
function createContent(title, url) {
    return `${title}\n${url}`;
}

/**
 * 引数で渡された内容をクリップボードにコピー
 *
 * @param {String} content クリップボードにコピーする内容
 */
function copyToClipboard(content) {
    var textarea = document.getElementById('textarea');
    textarea.value = content;
    textarea.select();
    document.execCommand('copy');
}

/**
 * 引数で指定されたタブで表示しているページのタイトルとURLをクリップボードにコピー
 *
 * @param {Tab} カレントウィンドウのアクティブなタブ
 */
function copyTitleAndUrlToClipboard(tab) {
    var content = createContent(tab.title, tab.url);
    copyToClipboard(content);
}

/**
 * アイコンクリック時のイベント
 */
chrome.browserAction.onClicked.addListener(function(tab) {
    copyTitleAndUrlToClipboard(tab);
});

/**
 * ショートカットキー入力時のイベント
 */
chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        copyTitleAndUrlToClipboard(tabs[0]);
    });
});
