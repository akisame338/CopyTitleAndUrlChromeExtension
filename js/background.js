(function() {
    const textarea = document.createElement('textarea');
    textarea.id = 'textarea';
    document.body.appendChild(textarea);
}());

/**
 * クリップボードにコピーする内容を生成
 *
 * @param  {String} title ページのタイトル
 * @param  {String} url   ページのURL
 * @param  {String} format_type クリップボードにコピーする形式を表す文字列
 * @return {String} クリップボードにコピーする内容
 */
function createContent(title, url, format_type) {
    let content;
    switch (format_type) {
        case 'markdown':
            content = `[${title}](${url})`;
            break;
        case 'textile':
            content = `"${title}":${url}`;
            break;
        case 'default':
        default:
            content = `${title}\n${url}`;
            break;
    }
    return content;
}

/**
 * 引数で渡された内容をクリップボードにコピー
 *
 * @param {String} content クリップボードにコピーする内容
 */
function copyToClipboard(content) {
    const textarea = document.getElementById('textarea');
    textarea.value = content;
    textarea.select();
    document.execCommand('copy');
}

/**
 * 引数で指定されたタブで表示しているページのタイトルとURLを指定した形式でクリップボードにコピー
 *
 * @param {Tab}    カレントウィンドウのアクティブなタブ
 * @param {String} クリップボードにコピーする形式を表す文字列
 */
function copyTitleAndUrlToClipboard(tab, format_type) {
    const content = createContent(tab.title, tab.url, format_type);
    copyToClipboard(content);
}

/**
 * ショートカットキー入力時のイベント
 */
chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.local.get({format_type: 'default'}, function(items) {
            const format_type = items.format_type;
            copyTitleAndUrlToClipboard(tabs[0], format_type);
        });
    });
});
