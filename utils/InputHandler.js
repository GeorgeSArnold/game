class InputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', this.handleUserInput.bind(this));
        document.addEventListener('keyup', this.handleUserInput.bind(this));
    }

    handleUserInput(e) {
        const { key, type } = e;

        if (this.player && this.player.components) {
            let playerMovementComponent = this.player.components["Movement"];

            if (type === 'keydown') {
                switch (key) {
                    // up
                    case "w":
                        playerMovementComponent.vY = -10;
                        break;
                    // down
                    case "s":
                        playerMovementComponent.vY = 10;
                        break;
                    // left
                    case "a":
                        playerMovementComponent.vX = -10;
                        break;
                    // right
                    case "d":
                        playerMovementComponent.vX = 10;
                        break;
                    default:
                        break;
                }
            } else if (type === 'keyup') {
                switch (key) {
                    // up
                    case "w":
                        playerMovementComponent.vY = 0;
                        break;
                    // down
                    case "s":
                        playerMovementComponent.vY = 0;
                        break;
                    // left
                    case "a":
                        playerMovementComponent.vX = 0;
                        break;
                    // right
                    case "d":
                        playerMovementComponent.vX = 0;
                        break;
                    default:
                        break;
                }
            }
        }

    }
}

export default InputHandler;
