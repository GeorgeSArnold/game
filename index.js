// imports
import Registry from "./ecs/Registry.js";
import Player from "./models/Player.js";
import MovementComponentModel from "./models/MovementComponentModel.js";
import PositionComponentModel from "./models/PositionComponentModel.js";

// utils
import Log from "./utils/Log.js";
import InputHandler from "./utils/InputHandler.js";

// init canvas > export
export const canvas = document.getElementById("gameScreen");
export const c = canvas.getContext('2d');
// fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// // LOG
Log.debug("#LOG-STATUS:")
Log.status("canvas...initialized")
Log.object("canvas object:", canvas)

class Game {
    constructor() {
        this.player = undefined;
        this.inputHandler = undefined;

        // init registry
        this.registry = new Registry();
        Log.status("<- Registry...initialized")
    }

    // setup and load
    initialize = () => {

        // player entitiy
        this.player = new Player();
        Log.status("<- player entity...initialized");
        Log.object("<- Player Object: ", this.player)

        // event listener > key-controlls wasd
        this.inputHandler = new InputHandler(this.player);
        Log.status("-> EventListener[keyup, keydown]...initialized");
        Log.object("<- inputHandler:", this.inputHandler)

        // registry > systems
        this.registry.addSystem("MovementSystem");
        Log.status("-> MovementSystem...initialized")
        this.registry.addSystem("RenderSystem");
        Log.status("-> RenderSystem...initialized")
        Log.object("<- systems objects > registry: ", this.registry.systems);

        // models > dummys
        const dummyMoveComp = new MovementComponentModel("Movement", 0, 0);
        Log.status("-> MovementComponentModel Object...initialized")
        Log.object("<- dummy MoveComp;", dummyMoveComp)
        const dummyPosComp = new PositionComponentModel("Position", 0, 0, 50, 50);
        Log.status("-> PositionComponentModel Object...initialized")
        Log.object("<- dummy PositionComp;", dummyPosComp)

        // create entity > registry
        this.player = this.registry.createEntity([dummyMoveComp, dummyPosComp])
        Log.status("-> registry > player [dummyMoveComp, dummyPosComp]...created")
        this.registry.addEntintyToSystem(this.player);

        // init input handler
        this.inputHandler = new InputHandler(this.player);
        Log.status("-> EventListener[keyup, keydown]...initialized");
        Log.object("<- inputHandler:", this.inputHandler);
    }

    // changing > values = position 
    update = () => {

        // udate systems
        this.registry.getSystem("MovementSystem").update();
        this.registry.getSystem("RenderSystem").update();

        // rec > loop  
        requestAnimationFrame(this.update);
    }

    // display > changed values
    render = () => {

        // rec > loop
        requestAnimationFrame(this.render);
    }
}

const game = new Game();
game.initialize();
game.update();
game.render();