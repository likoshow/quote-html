'use babel';

export default {

	activate(state) {

		// Register command that toggles this view
		console.log("2345678");
		atom.commands.add('atom-workspace', {
			'quote-html:toHTML': () => this.action()
		})
		atom.commands.add('atom-workspace', {
			'quote-html:2to1': () => this.toggle(1)
		})
		atom.commands.add('atom-workspace', {
			'quote-html:1to2': () => this.toggle(2)
		})
	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.quoteHtmlView.destroy();
	},
	escapeLine(text, splitStr, str) {
		str = str || '\' \+' + splitStr
		let strList = text.match(/^([\t|\s]+)/)
		if (strList && strList.length) {
			let headStr = strList[0]
			let strLen = headStr.length
			if (text.slice(strLen).length) {
				return headStr + '\'' + text.slice(strLen) + str
			}
			return '';
		} else {
			return '\'' + text + str
		}
	},
	getSplitStr(texts) {
		if (texts.indexOf('\n\r') !== -1) {
			return '\n\r'
		} else if (texts.indexOf('\r') !== -1) {
			return '\r'
		}
		return '\n'
	},
	escape(texts) {
		let splitStr = this.getSplitStr(texts)
		let textList = texts.split(splitStr)
		let html = ''
		let len = textList.length - 1
		let i = 0
		if (textList.length) {
			for (; i < len; i++) {
				html += this.escapeLine(textList[i], splitStr)
			}
			html += this.escapeLine(textList[i], splitStr, '\';')
		}
		return html;
	},
	quoteToggle(texts, num){
		if(num === 2){
			return texts.replace(/'/g, '"')
		}
		else {
			return texts.replace(/"/g, '\'')
		}
	},
	
    toggle(num){
        let editor = atom.workspace.getActiveTextEditor()
		let selections = editor.getSelections()
		for (let i = 0, len = selections.length; i < len; i++) {
			let selection = selections[i]
			selection.insertText(this.quoteToggle(selection.getText(), num))
		}
    },
	action() {
		let editor = atom.workspace.getActiveTextEditor()
		let selections = editor.getSelections()
		for (let i = 0, len = selections.length; i < len; i++) {
			let selection = selections[i]
			selection.insertText(this.escape(selection.getText()))
		}
	}

};
