'use babel';

const KEYBOARD_MAP_MAX_LENGTH = 200;

let keyCode = null,
    keyLog = [];

const TouretteKeyboardLogger = {
    keydown(event) {
        keyCode = event.keyCode;
    },

    keypress(event) {
        let charCode = event.charCode,
            shiftKey = event.shiftKey;

        keyLog.push({
            'keyCode': keyCode, 'charCode': charCode, 'shiftKey': shiftKey
        });

        this.truncateKeyLog();

        keyCode = null;
    },

    truncateKeyLog() {
        if( keyLog.length > KEYBOARD_MAP_MAX_LENGTH ) keyLog.shift();
    },

    getKeyLog() {
        return keyLog;
    },

    getReducedKeyLog() {
        let keyLogReduced = keyLog.reduce((reduced, initial) => {
            if( initial.shiftKey ) {
                reduced[initial.charCode] = { 'shift': initial.keyCode };
            } else {
                reduced[initial.charCode] = initial.keyCode;
            }

            return reduced;
        }, []);

        return keyLogReduced;
    },
};

export default TouretteKeyboardLogger;
