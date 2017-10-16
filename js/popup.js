(function() {
    const FORMAT_TYPE_KEY = 'format_type';

    const FORMAT_TYPE_DEFAULT  = 'default';
    const FORMAT_TYPE_MARKDOWN = 'markdown';
    const FORMAT_TYPE_TEXTILE  = 'textile';

    // ローカルストレージに値がセットされていない場合（初回起動時を想定）は
    // デフォルト形式（改行区切り）が選択されているものとして扱う
    let format_type = localStorage.getItem(FORMAT_TYPE_KEY);
    if (format_type === null) {
        localStorage.setItem(FORMAT_TYPE_KEY, FORMAT_TYPE_DEFAULT);
        format_type = FORMAT_TYPE_DEFAULT;
    }

    let default_format_radio  = document.getElementById('default_format');
    let markdown_format_radio = document.getElementById('markdown_format');
    let textile_format_radio  = document.getElementById('textile_format');

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

    default_format_radio.onchange = function() {
        localStorage.setItem(FORMAT_TYPE_KEY, FORMAT_TYPE_DEFAULT);
    }
    markdown_format_radio.onchange = function() {
        localStorage.setItem(FORMAT_TYPE_KEY, FORMAT_TYPE_MARKDOWN);
    }
    textile_format_radio.onchange = function() {
        localStorage.setItem(FORMAT_TYPE_KEY, FORMAT_TYPE_TEXTILE);
    }
}());
