class KeyInputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', this.handleUserInput.bind(this));
        document.addEventListener('keyup', this.handleUserInput.bind(this));
    }

    handleUserInput(e) {
        const { key, type } = e;
        const playerMovementComponent = this.player?.components?.["Movement"];

        if (playerMovementComponent) {
            switch (key) {
                case "w": playerMovementComponent.vY = (type === 'keydown') ? -10 : 0; break;
                case "s": playerMovementComponent.vY = (type === 'keydown') ? 10 : 0; break;
                case "a": playerMovementComponent.vX = (type === 'keydown') ? -10 : 0; break;
                case "d": playerMovementComponent.vX = (type === 'keydown') ? 10 : 0; break;
                default: break;
            }
        }
    }
}

export default KeyInputHandler;
