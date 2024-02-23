import { canvas, c } from "../index.js"

class System {
    constructor(systemType) {
        this.systemType = systemType;
        this.entities = [];
    }
}
class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Movement", "Position"];
    }

    update = () => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            let { Movement, Position } = entity.components;

            // check target
            if (entity.targetPosition) {
                const dx = entity.targetPosition.x - Position.x;
                const dy = entity.targetPosition.y - Position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 5) {
                    Movement.vX = 0;
                    Movement.vY = 0;
                    entity.targetPosition = undefined;
                    continue;
                }
            }

            // default move
            Position.x += Movement.vX;
            Position.y += Movement.vY;
        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = () => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.entities.length; i++) {

            const { Position, Sprite } = this.entities[i].components;
            const { x, y, width, height } = Position;
            const { srcRect, path, sprite } = Sprite;
            const { x: sx, y: sy, width: sw, height: sh } = srcRect;

            // draw
            c.beginPath();
            // c.fillStyle = "green";
            // c.fillRect(x, y, width, height);
            c.drawImage(sprite, sx, sy, sw, sh, x, y, width, height)
            c.stroke();

            //check
            // console.log("Entities in RenderSystem:", this.entities);d            
        }
    }
}

class AnimationSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite", "Animation"];
    }
    update = (gameTime) => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            const { facing, shouldAnimate } = entity.components["Animation"];

            if (shouldAnimate) {
                const currentFrame = Math.floor(
                    (gameTime - entity.components["Animation"]["currentTimeOfAnimation"]) *
                    entity.components["Animation"]["frames"][facing]["move"]["frameSpeedRate"] / 1000
                ) % entity.components["Animation"]["frames"][facing]["move"]["numFrames"];

                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing]["move"]["srcRect"][currentFrame];
                entity.components["Animation"]["frames"][facing]["move"]["currentframe"] = currentFrame;
            }


        }
    }
}

export { MovementSystem, RenderSystem, AnimationSystem };