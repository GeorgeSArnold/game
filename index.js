// imports
import Registry from "./ecs/Registry.js";
import Player from "./models/Player.js";
import MovementComponentModel from "./models/MovementComponentModel.js";
import PositionComponentModel from "./models/PositionComponentModel.js";

// utils
import Log from "./utils/Log.js";
import KeyInputHandler from "./utils/KeyInputHandler.js";
import MouseInputHandler from "./utils/MouseInputHandler.js";

// init canvas > export
export const canvas = document.getElementById("gameScreen");
export const c = canvas.getContext('2d');
// fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// LOG
Log.debug("#LOG-STATUS:")
Log.status("canvas...initialized")
Log.object("canvas object:", canvas)

class Game {
    constructor() {
        // player
        this.player = undefined;

        // handler
        this.keyInputHandler = undefined;
        this.mouseInputHandler = undefined;

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

        // input handler key, mouse
        this.keyInputHandler = new KeyInputHandler(this.player);
        Log.status("-> keyInputHandler...initialized");
        Log.object("<- inputHandler:", this.keyInputHandler);
        this.mouseInputHandler = new MouseInputHandler(this.player);
        Log.status("-> keyInputHandler...initialized");
        Log.object("<- inputHandler:", this.mouseInputHandler);
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