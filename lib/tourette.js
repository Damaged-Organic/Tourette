'use babel';

import { Disposable, CompositeDisposable } from 'atom';

import TouretteKeyboardLayout from './tourette-keyboard-layout';
import TouretteKeyboardLogger from './tourette-keyboard-logger';

const Tourette = {
    subscriptions: null,

    dictionary: [],

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        let keyCode, charCode;

        this.subscriptions.add(
            atom.workspace.observeTextEditors((editor) => {
                let editorView = atom.views.getView(editor);

                editorView.addEventListener('keydown',
                    TouretteKeyboardLogger.keydown.bind(TouretteKeyboardLogger)
                );
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
