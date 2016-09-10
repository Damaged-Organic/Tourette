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
                let reducedDictionary = TouretteKeyboardLogger.getReducedKeyLog();
                let keyboardLayout = TouretteKeyboardLayout.getKeyboardLayout();

                let convertedSelection = selection.replace(/./g, (character) => {
                    let charCodeAt = character.charCodeAt(0),
                        qwertyCharacter = null;

                    if( reducedDictionary[charCodeAt] && reducedDictionary[charCodeAt].shift ) {
                        qwertyCharacter = keyboardLayout.shift[reducedDictionary[charCodeAt].shift];
                    } else {
                        qwertyCharacter = keyboardLayout[reducedDictionary[charCodeAt]];
                    }

                    return qwertyCharacter || character;
                });

                editor.insertText(convertedSelection);
            }
        }

        // let editor = atom.workspace.getActiveTextEditor();
        //
        // if( editor ) {
        //     let dictionary = {};
        //
        //     try {
        //         dictionary = TouretteDictionary.dictionary(
        //             'russian', 'english'
        //         );
        //     } catch(error) {
        //         atom.notifications.addError('Tourette: dictionary loading failed!');
        //     }
        //
        //     let selection = editor.getSelectedText();
        //
        //     if( selection ) {
        //         selection = selection.replace(/./g, (x) => {
        //             return ( dictionary[x] ) ? dictionary[x] : x;
        //         });
        //
        //         editor.insertText(selection);
        //     }
        //
        // }
    },
};

export default Tourette;
