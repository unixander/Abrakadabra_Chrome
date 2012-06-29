
function checkInput(node) {
    var elem = $(node);
    
    if (elem.length > 0) {
        elem.val(translate(elem.val()));
    }
}

function getSelectedNode(selection) {
    return selection.createRange
        ? selection.createRange().parentElement()
        : selection.startContainer.parentNode;
}

function getDocumentSelection() {
    if (document.selection) {
        return document.selection.createRange();
    } else {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            return selection.getRangeAt(0);
        }
    }
}

function translateSelection() {
    var selection = getDocumentSelection(),
        selectedText = selection + "",
        selectedNode = getSelectedNode(selection),
        activeNode = document.activeElement,
        activeNodeTag = activeNode.tagName + "",
        start = selection.startOffset,
        end = selection.endOffset;

    if (activeNodeTag.indexOf("TEXT") > -1 || activeNodeTag.indexOf("input") > -1) {
        selectedNode = activeNode;
    }

    if (selectedNode == undefined) {
        return;
    }

    if (selectedNode.tagName.indexOf("TEXT") > -1 || selectedNode.tagName.indexOf("input") > -1) {
        selectedNode.focus();
        var val = selectedNode.value;

        if (selectedText.length > 0 && val.indexOf(selection) > -1) {
            selectedNode.value = val.substring(0, start) + translate(selectedText) + val.substring(end);
        } else {
            checkInput(selectedNode);
            return;
        }
    } else if (selectedText != "") {
        val = selectedNode.innerHTML;

        if (selectedText.length > 0 && val.indexOf(selection) > -1) {
            selectedNode.innerHTML = val.substring(0, start) + translate(selectedText) + val.substring(end);
        }
    }
}

function translate(text) {
    var result = "",
        enLetters = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?`~&^',
        ruLetters = 'йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,ёЁ?:',
        language = ruLetters;

    for (var i = 0, len = text.length; i < len; i++) {
        var chr = text.charAt(i),
            rIndex = ruLetters.indexOf(chr),
            eIndex = enLetters.indexOf(chr);

        if (rIndex > -1 && eIndex > -1) {
            result += language == ruLetters
                ? ruLetters[eIndex]
                : enLetters[rIndex];
        } else if (rIndex > -1) {
            result += enLetters[rIndex];
            language = enLetters;
        } else if (eIndex > -1) {
            result += ruLetters[eIndex];
            language = ruLetters;
        } else {
            result += chr;
        }
    }
    return result;
}