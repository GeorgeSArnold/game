class Component {
    constructor(componentType) {
        this.componentType = componentType;
    }
}

class PositionComponent extends Component {
    constructor(componentType, componentObj ) {
        super (componentType)

        this.x = componentObj.x;
        this.y = componentObj.y;
        this.width = componentObj.width;
        this.height = componentObj.height;
    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj) {
        super (componentType)
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.collisionX = false;
        this.collisionY = false;
    }
}

class SpriteComponent extends Component {
    constructor(componentType, componentObj) {
        super (componentType);
        this.sprite = new Image();
        this.sprite.src = componentObj.path;
        this.srcRect = componentObj.srcRect;
    }
}

class AnimationComponent extends Component {
    constructor(componentType, componentObj) {
        super (componentType);
        this.frames = componentObj.frames;
        this.currentTimeOfAnimation = componentObj.currentTimeOfAnimation;
        this.facing = componentObj.facing;
        this.shouldAnimate = componentObj.shouldAnimate;
    }
}

export { PositionComponent, MovementComponent, SpriteComponent, AnimationComponent };