class InputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', this.handleUserInput.bind(this));
        document.addEventListener('keyup', this.handleUserInput.bind(this));
    }

    handleUserInput(e) {
        const { key, type } = e;

        if (this.player) {
            if (type === 'keydown') {
                switch (key) {
                    // up
                    case "w":
                        this.player.y -= 10
                        break;
                    // down
                    case "s":
                        this.player.y += 10
                        break;
                    // left
                    case "a":
                        this.player.x -= 10
                        break;
                    // right
                    case "d":
                        this.player.x += 10
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

export default InputHandler;