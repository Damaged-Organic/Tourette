'use babel';

const KEYBOARD_LAYOUT = require('../resources/keyboard_layouts/qwerty.json');

const TouretteKeyboardLayout = {
    getKeyboardLayout() {
        return KEYBOARD_LAYOUT;
    },
};

export default TouretteKeyboardLayout;
