'use babel';

import QuoteHtmlView from './quote-html-view';
import { CompositeDisposable } from 'atom';

export default {

  quoteHtmlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.quoteHtmlView = new QuoteHtmlView(state.quoteHtmlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.quoteHtmlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'quote-html:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.quoteHtmlView.destroy();
  },
	escapeLine(text, splitStr, str){
		str = str || '\' \+' + splitStr
		let strList = text.match(/^([\t|\s]+)/)
		if(strList && strList.length){
			let headStr = strList[0]
			let strLen = headStr.length
			if(text.slice(strLen).length){
				return headStr + '\'' + text.slice(strLen) + str
			}
			return '';
		}
		else {
		 	return'\'' + text + str
		}
	},
	getSplitStr(texts){
		if(texts.indexOf('\n\r') !== -1){
			return '\n\r'
		}
		else if (texts.indexOf('\r') !== -1) {
			return '\r'
		}
		return '\n'
	},
	escape(texts){
		let splitStr = this.getSplitStr(texts)
		let textList = texts.split(splitStr)
		let html = ''
		let len = textList.length - 1
		let i = 0
		if(textList.length){
			for (; i < len; i++) {
				html += this.escapeLine(textList[i], splitStr)
			}
			html += this.escapeLine(textList[i], splitStr, '\';')
		}
		return html;
	},
	toggle() {
		let editor = atom.workspace.getActiveTextEditor()
		let selections = editor.getSelections()
		for (let i = 0, len = selections.length; i < len; i++) {
			let selection = selections[i]
			selection.insertText(this.escape(selection.getText()))
		}
	}

};
