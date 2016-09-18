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

	escape(texts){
		let textList = texts.split('\n')
		let htmlList = []
		if(textList.length){
			for (let i = 0; i < textList.length; i++) {
				htmlList.push(textList[i].trim()) 
			}
		}
		return '\'' + htmlList.join('\' \+\n\'') + '\';'
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
