// imports
import Registry from "./ecs/Registry.js";
import Player from "./models/Player.js";

// comps
import MovementComponentModel from "./models/MovementComponentModel.js";
import PositionComponentModel from "./models/PositionComponentModel.js";
import SpriteComponentModel from "./models/SpriteComponentModel.js";

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

// animations
import { WARRIOR_ANIMATION } from "./models/animations/animation.js";

// LOG
Log.debug("#LOG-STATUS:")
Log.status("<- canvas...initialized")
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
        Log.status("<- registry...initialized")
    }

    // setup and load
    initialize = () => {

        // player entitiy
        this.player = new Player();
        Log.status("<- player entity...initialized");
        Log.object("Player Object: ", this.player)

        // registry > systems
        this.registry.addSystem("MovementSystem");
        Log.status("<- MovementSystem...initialized")
        this.registry.addSystem("RenderSystem");
        Log.status("<- RenderSystem...initialized")
        Log.object("registry > systems: ", this.registry.systems);

        // models > dummys
        Log.debug("#COMPONENTS")
        const dummyMoveComp = new MovementComponentModel("Movement", 0, 0);
        Log.status("<- MovementComponentModel Object...initialized")
        Log.object("dummy MoveComp;", dummyMoveComp)
        const dummyPosComp = new PositionComponentModel("Position", 0, 0, 120, 110);
        Log.status("<- PositionComponentModel Objectc")
        Log.object("dummy PositionComp;", dummyPosComp)
        const dummySpriteComp = new SpriteComponentModel(
            "Sprite",
            "./assets/mage.png",
            0,
            0,
            40,
            33,
        )
        Log.status("<- SpritSpriteComponentModel...initialized")
        Log.object("SpritSpriteComponentModel", dummySpriteComp)

        // create entity > registry
        this.player = this.registry.createEntity([dummyMoveComp, dummyPosComp, dummySpriteComp, dummySpriteComp])
        Log.status("<- create entity: player > [dummyMoveComp, dummyPosComp]")
        Log.object("Player:",this.player)
        this.registry.addEntintyToSystem(this.player);
        Log.status("<- addEntintyToSystem(this.player)");

        // input handler key, mouse
        Log.debug("#INPUT")
        this.keyInputHandler = new KeyInputHandler(this.player);
        Log.status("<- KeyInputHandler...initialized");
        Log.object("KeyInputHandler:", this.keyInputHandler);
        this.mouseInputHandler = new MouseInputHandler(this.player);
        Log.status("<- MouseInputHandler...initialized");
        Log.object("mouseInputHandler:", this.mouseInputHandler);
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