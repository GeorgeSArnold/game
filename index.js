// imports
import Registry from "./ecs/Registry.js";
import Player from "./models/Player.js";

// models
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
import { MAGE_ANIMATION } from "../models/animations/MageAnimation.js";

// LOG
Log.debug("#LOG-STATUS:")
// Log.status("<- canvas...initialized")
// Log.object("canvas object:", canvas)

class Game {
    constructor() {

        // gametime
        this.gameTime = Date.now();

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
        Log.debug("#SYSTEMS")
        this.registry.addSystem("MovementSystem");
        Log.status("<- MovementSystem...initialized")
        this.registry.addSystem("RenderSystem");
        Log.status("<- RenderSystem...initialized")

        this.registry.addSystem("AnimationSystem");
        Log.status("<- AnimationSystem...initialized");
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

        // create registry > entity > dummys, animation
        this.player = this.registry.createEntity([
            dummyMoveComp,
            dummyPosComp,
            dummySpriteComp,
            MAGE_ANIMATION
        ])

        Log.status("<- MageAnimation...initialized")
        Log.object("MageAnimation:", MAGE_ANIMATION)
        Log.object("Player:", this.player)
        this.registry.addEntintyToSystem(this.player);
        Log.status("<- entity added > (this.player)");

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
        // time update
        this.gameTime = Date.now();

        // udate systems
        this.registry.getSystem("MovementSystem").update();
        this.registry.getSystem("RenderSystem").update();
        this.registry.getSystem("AnimationSystem").update(this.gameTime);

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