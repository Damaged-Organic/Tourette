'use babel';

const KEYBOARD_MAP_MAX_LENGTH = 200;

const TouretteKeyboardLogger = {
    keyCode: null,

    keyLog: [],

    keydown(event) {
        this.keyCode = event.keyCode;
    },

    keypress(event) {
        let charCode = event.charCode,
            shiftKey = event.shiftKey;

        this.keyLog.push({
            'keyCode': this.keyCode, 'charCode': charCode, 'shiftKey': shiftKey
        });

        console.log(this.keyLog);

        this.truncateKeyLog();

        this.keyCode = null;
    },

    truncateKeyLog() {
        if( this.keyLog.length > KEYBOARD_MAP_MAX_LENGTH ) this.keyLog.shift();
    },

    getKeyLog() {
        return this.keyLog;
    },

    getReducedKeyLog() {
        let keyLog = this.keyLog.reduce((reduced, initial) => {
            if( initial.shiftKey ) {
                reduced[initial.charCode] = { 'shift': initial.keyCode };
            } else {
                reduced[initial.charCode] = initial.keyCode;
            }

            return reduced;
        }, []);

        return keyLog;
    },
};

export default TouretteKeyboardLogger;
