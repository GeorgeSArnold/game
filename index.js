
// imports
import Registry from "./ecs/Registry.js";
import Player from "./models/Player.js";
import MovementComponentModel from "./models/MovementComponentModel.js";
import PositionComponentModel from "./models/PositionComponentModel.js";

import Log from "./utils/Log.js";

// init canvas
const canvas = document.getElementById("gameScreen");
const c = canvas.getContext('2d');

// set > canvas size = fullscreen
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

// // LOG
Log.debug ("#LOG-STATUS:")
Log.status("canvas...initialized")
Log.object("canvas object:", canvas)

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry();
    }

    // setup and load
    initialize = () => {

        // registry
        this.registry.addSystem("MovementSystem");
        Log.status ("-> Registry...initialized")
        Log.object("<- systems objects > registry: ", this.registry.systems);
    
        // event listener
        document.addEventListener('keyup', this.handleUserInput);
        document.addEventListener('keydown', this.handleUserInput);
        Log.status("-> EventListener[keyup, keydown]...initialized");

        // player
        this.player = new Player();
        Log.status("-> Player Object...initialized");
        Log.object("<- Player Object: ", this.player)  

        // models > dummys
        const dummyMoveComp = new MovementComponentModel("Movement", 0, 0);
        Log.status("-> MovementComponentModel Object...initialized")
        Log.object("<- dummy MoveComp;", dummyMoveComp)
        const dummyPosComp = new PositionComponentModel("Position", 2, 0, 50, 50);
        Log.status("-> PositionComponentModel Object...initialized")
        Log.object("<- dummy PositionComp;", dummyPosComp)

        // add entity > registys
        const entity = this.registry.createEntity([dummyMoveComp, dummyPosComp])
        this.registry.addEntintyToSystem(entity);
    }

    // changing > values = position 
    update = () => {

        // udate systems
        this.registry.getSystem("MovementSystem").update();

        // rec > loop  
        requestAnimationFrame(this.update);
    }

    // display > changed values
    render = () => {
        const { x, y, width, height } = this.player;
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.beginPath();
        c.fillStyle = "green"
        c.fillRect(x, y, width, height)
        c.stroke();

        // rec > loop
        requestAnimationFrame(this.render);
    }

    handleUserInput = (e) => {
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

const game = new Game();
game.initialize();
game.update();
game.render();


