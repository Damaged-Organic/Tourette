'use babel';

import { Disposable, CompositeDisposable } from 'atom';

import TouretteDictionary from './tourette-dictionary';

const DICTIONARY_MAX_LENGTH = 5;

const Tourette = {
    subscriptions: null,

    qwertyMatrix: {
        81: "q", 87: "w", 69: "e", 82: "r", 84: "t", 89: "y", 85: "u", 73: "i", 79: "o", 80: "p", 219: "[", 221: "]",
        65: "a", 83: "s", 68: "d", 70: "f", 71: "g", 72: "h", 74: "j", 75: "k", 76: "l", 186: ";", 222: "'", 220: "\\",
        90: "z", 88: "x", 67: "c", 86: "v", 66: "b", 78: "n", 77: "m", 188: ",", 190: ".", 191: "/",
        "shift": {
            49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*",
            81: "Q", 87: "W", 69: "E", 82: "R", 84: "T", 89: "Y", 85: "U", 73: "I", 79: "O", 80: "P", 219: "{", 221: "}",
            65: "A", 83: "S", 68: "D", 70: "F", 71: "G", 72: "H", 74: "J", 75: "K", 76: "L", 186: ":", 222: "\"", 220: "|",
            90: "Z", 88: "X", 67: "C", 86: "V", 66: "B", 78: "N", 77: "M", 188: "<", 190: ">", 191: "?"
        }
    },

    dictionary: [],

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        let keyCode, charCode;

        this.subscriptions.add(
            atom.workspace.observeTextEditors((editor) => {
                let editorView = atom.views.getView(editor);

                editorView.addEventListener('keydown', (event) => {
                    keyCode = event.keyCode;
                });

                editorView.addEventListener('keypress', (event) => {
                    charCode = event.charCode;

                    this.dictionary.push({ charCode: keyCode });

                    if( this.dictionary.length > DICTIONARY_MAX_LENGTH ) {
                        this.dictionary.pop();
                    }

                    keyCode = null;

                    console.log(this.dictionary);
                });
            })
        );

        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
              'tourette:convert': this.convert
          })
        );
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    convert() {
        let editor = atom.workspace.getActiveTextEditor();

        if( editor ) {
            let dictionary = {};

            try {
                dictionary = TouretteDictionary.dictionary(
                    'russian', 'english'
                );
            } catch(error) {
                atom.notifications.addError('Tourette: dictionary loading failed!');
            }

            let selection = editor.getSelectedText();

            if( selection ) {
                selection = selection.replace(/./g, (x) => {
                    return ( dictionary[x] ) ? dictionary[x] : x;
                });

                editor.insertText(selection);
            }

        }
    },
};

export default Tourette;
