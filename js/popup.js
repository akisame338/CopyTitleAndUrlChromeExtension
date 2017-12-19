(function() {
    const FORMAT_TYPE_DEFAULT  = 'default';
    const FORMAT_TYPE_MARKDOWN = 'markdown';
    const FORMAT_TYPE_TEXTILE  = 'textile';

    let default_format_radio  = document.getElementById('default_format');
    let markdown_format_radio = document.getElementById('markdown_format');
    let textile_format_radio  = document.getElementById('textile_format');

    // ストレージに値がセットされていない場合（初回起動時を想定）は
    // デフォルト形式（改行区切り）が選択されているものとして扱う
    chrome.storage.local.get({format_type: null}, function(items) {
        let format_type = items.format_type;
        if (format_type === null) {
            format_type = FORMAT_TYPE_DEFAULT;
            chrome.storage.local.set({format_type: FORMAT_TYPE_DEFAULT}, function(){});
        }

        switch (format_type) {
            case FORMAT_TYPE_DEFAULT:
                default_format_radio.checked = true;
                break;
            case FORMAT_TYPE_MARKDOWN:
                markdown_format_radio.checked = true;
                break;
            case FORMAT_TYPE_TEXTILE:
                textile_format_radio.checked = true;
                break;
        }
    });


    default_format_radio.onchange = function() {
        chrome.storage.local.set({format_type: FORMAT_TYPE_DEFAULT}, function(){});
    }
    markdown_format_radio.onchange = function() {
        chrome.storage.local.set({format_type: FORMAT_TYPE_MARKDOWN}, function(){});
    }
    textile_format_radio.onchange = function() {
        chrome.storage.local.set({format_type: FORMAT_TYPE_TEXTILE}, function(){});
    }
}());
