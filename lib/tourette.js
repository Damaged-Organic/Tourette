'use babel';

import { CompositeDisposable } from 'atom';

import TouretteDictionary from './tourette-dictionary';

const Tourette = {
    subscriptions: null,

    activate(state) {
        this.subscriptions = new CompositeDisposable();

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
            let dictionary = TouretteDictionary.dictionary(
                'russian', 'english'
            );

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
