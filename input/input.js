class Input {
    constructor() {
        this.keyState = {};
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown = (e) => {
        this.keyState[e.key] = true;
    }

    handleKeyUp = (e) => {
        this.keyState[e.key] = false;
    }

    isKeyDown = (key) => {
        return !!this.keyState[key];
    }
}
export default Input;