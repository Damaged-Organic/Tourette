'use babel';

import { Disposable, CompositeDisposable } from 'atom';

import TouretteKeyboardLayout from './tourette-keyboard-layout';
import TouretteKeyboardLogger from './tourette-keyboard-logger';

const Tourette = {
    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        this.subscriptions.add(
            atom.workspace.observeTextEditors((editor) => {
                let editorView = atom.views.getView(editor);

                editorView.addEventListener('keydown', (event) => {
                    console.log(event.keyCode);
                });
                editorView.addEventListener('keypress',
                    TouretteKeyboardLogger.keypress.bind(TouretteKeyboardLogger)
                );
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
              'tourette:convert': this.convert.bind(this)
            })
        );
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    convert() {
        let editor = atom.workspace.getActiveTextEditor();

        if( editor ) {
            let selection = editor.getSelectedText();

            if( selection ) {
                let reducedKeyLog = TouretteKeyboardLogger.getReducedKeyLog();

                let convertedSelection = TouretteKeyboardLayout.convertToKeyboardLayout(
                    selection, reducedKeyLog
                );

                editor.insertText(convertedSelection);
            }
        }
    },
};

export default Tourette;
