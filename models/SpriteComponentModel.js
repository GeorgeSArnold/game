export default class SpriteComponentModel {
    constructor (name, path, x, y, width, height) {
        this.name = name;
        this.value = {
            path: path,
            srcRect: {
                x: x,
                y: y,
                width: width,
                height: height,
            }
        };
    }
}