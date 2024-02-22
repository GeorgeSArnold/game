import { canvas, c } from "../index.js"
import Log from "../utils/Log.js";

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

            Position.x += Movement.vX;
            Position.y += Movement.vY;
            // check
            // Log.status("Movementsystem: ", Position.y)
        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position"];
    }

    update = () => {
        for(let i = 0; i < this.entities.length; i++) {

            const { Position } = this.entities[i].components;
            const { x, y, width, height} = Position;

            // clear 
            c.clearRect(0, 0, canvas.width, canvas.height);
            // draw
            c.beginPath();
            c.fillStyle = "green";
            c.fillRect(x, y, width, height);
            c.stroke();

            //check
            // console.log("Entities in RenderSystem:", this.entities);d            
        }
    }
}

export { MovementSystem, RenderSystem };