'use babel';

const KEYBOARD_LAYOUT = require('../resources/keyboard_layouts/qwerty.json');

const TouretteKeyboardLayout = {
    getKeyboardLayout() {
        return KEYBOARD_LAYOUT;
    },

    convertToKeyboardLayout(selection, keyLog) {
        selection = selection.replace(/./g, (character) => {
            let charCodeAt = character.charCodeAt(0),
                qwertyCharacter = null;

            if( keyLog[charCodeAt] && keyLog[charCodeAt].shift ) {
                qwertyCharacter = KEYBOARD_LAYOUT.shift[keyLog[charCodeAt].shift];
            } else {
                qwertyCharacter = KEYBOARD_LAYOUT[keyLog[charCodeAt]];
            }

            return qwertyCharacter || character;
        });

        return selection;
    },
};

export default TouretteKeyboardLayout;
