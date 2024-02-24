class KeyInputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', this.handleUserInput.bind(this));
        document.addEventListener('keyup', this.handleUserInput.bind(this));
    }

    handleUserInput(e) {
        const { key, type } = e;
        const playerMovementComponent = this.player?.components?.["Movement"];
        const playerAnimationComponent = this.player?.components?.["Animation"];

        if (playerMovementComponent && type === "keydown") {
            
            switch (key) {
                case "w": {
                    playerAnimationComponent.shouldAnimate = true;
                    playerAnimationComponent.facing = "up";
                    playerMovementComponent.vY = -10;
                    break;
                }
                case "s": {
                    playerAnimationComponent.shouldAnimate = true;
                    playerAnimationComponent.facing = "down";
                    playerMovementComponent.vY = 10;
                    break;
                }
                case "a": {
                    playerAnimationComponent.shouldAnimate = true;
                    playerAnimationComponent.facing = "left";
                    playerMovementComponent.vX = -10;
                    break;
                }
                case "d": {
                    playerAnimationComponent.shouldAnimate = true;
                    playerAnimationComponent.facing = "right";
                    playerMovementComponent.vX = 10;
                    break;
                }
                default: {
                    // Set shouldAnimate to false for any keyup event
                    playerAnimationComponent.shouldAnimate = (type === 'keyup') ? false : true;
                    break;
                }
            }
        }
        else if (type === "keyup") {
            switch (key) {
                case "w":
                case "s": {
                    playerAnimationComponent.shouldAnimate = false;
                    playerMovementComponent.vY = 0;
                    break;
                }
                case "a":
                case "d": {
                    playerAnimationComponent.shouldAnimate = false;
                    playerMovementComponent.vX = 0;
                    break;
                }
                default:
                    break;
            }
        }
    }
}

export default KeyInputHandler;