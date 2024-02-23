import { canvas } from "../index.js";

class MouseInputHandler {
    constructor(player) {
        this.player = player;

        document.addEventListener('click', this.handleMouseClick.bind(this));
    }

    handleMouseClick(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let playerPositionComponent = this.player.components["Position"];
        let playerMovementComponent = this.player.components["Movement"];

        const distanceX = mouseX - playerPositionComponent.x;
        const distanceY = mouseY - playerPositionComponent.y;

        const angle = Math.atan2(distanceY, distanceX);

        const speed = 10;
        playerMovementComponent.vX = speed * Math.cos(angle);
        playerMovementComponent.vY = speed * Math.sin(angle);

        // set position
        this.player.targetPosition = { x: mouseX, y: mouseY };
    }
}

export default MouseInputHandler;