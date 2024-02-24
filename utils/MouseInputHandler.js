import { canvas } from "../index.js";

class MouseInputHandler {
    constructor(player) {
        this.player = player;

        document.addEventListener('click', this.handleMouseClick.bind(this));
        // document.addEventListener('contextmenu', this.handleRightClick.bind(this));
    }


    handleMouseClick(e) {
        const { clientX, clientY } = e;
        this.handleMouseInput(clientX, clientY);
    }

    // handleRightClick(e) {
    //     const { clientX, clientY } = e;
    //     this.handleMouseInput(clientX, clientY);
    //     e.preventDefault(); // Prevent the default context menu
    // }

    handleMouseInput(mouseX, mouseY) {
        this.isClicked = true; 
        const playerPositionComponent = this.player.components["Position"];
        const playerMovementComponent = this.player.components["Movement"];
        const playerAnimationComponent = this.player.components["Animation"];

        const distanceX = mouseX - playerPositionComponent.x;
        const distanceY = mouseY - playerPositionComponent.y;

        const angle = Math.atan2(distanceY, distanceX);

        const speed = 10;
        playerMovementComponent.vX = speed * Math.cos(angle);
        playerMovementComponent.vY = speed * Math.sin(angle);

        // set position
        this.player.targetPosition = { x: mouseX, y: mouseY };

        // set facing > click
        playerAnimationComponent.shouldAnimate = true;
        playerAnimationComponent.facing = this.calculateFacing(angle);

        // stop animation
        const distanceToTarget = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distanceToTarget < 3 || (playerMovementComponent.vX === 0 && playerMovementComponent.vY === 0)) {
            playerAnimationComponent.shouldAnimate = false;
            playerMovementComponent.vX = 0;
            playerMovementComponent.vY = 0;
        }
    }

    calculateFacing(angle) {
        const PI = Math.PI;
        if (angle >= -PI / 4 && angle < PI / 4) {
            return "right";
        } else if (angle >= PI / 4 && angle < 3 * PI / 4) {
            return "down";
        } else if (angle >= -3 * PI / 4 && angle < -PI / 4) {
            return "up";
        } else {
            return "left";
        }
    }
}

export default MouseInputHandler;