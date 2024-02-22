const Log = {
    status: function(text, obj = null) {
        const styles = {
            color: '#33B683',
            fontSize: '12px',
            fontFamily: 'Consolas'
        };

        const styleString = Object.entries(styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';');

        if (obj) {
            console.log(`%c${text}`, `${styleString}; font-weight: bold;`, obj);
        } else {
            console.log(`%c${text}`, styleString);
        }
    },
    object: function(text, obj = null) {
        const styles = {
            color: '#3ff763',
            fontSize: '12px',
            fontFamily: 'Monaco'
        };

        const styleString = Object.entries(styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';');

        if (obj) {
            console.log(`%c${text}`, `${styleString}; font-weight: bold;`, obj);
        } else {
            console.log(`%c${text}`, styleString);
        }
    },
    debug: function(text, obj = null) {
        const styles = {
            color: '#ADD8E6',
            fontSize: '14px',
            fontFamily: 'Source Code Pro'
        };

        const styleString = Object.entries(styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join(';');

        if (obj) {
            console.log(`%c${text}`, `${styleString}; font-weight: ;`, obj);
        } else {
            console.log(`%c${text}`, styleString);
        }
    }
};

export default Log;
