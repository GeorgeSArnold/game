export default class PositionComponentModel {
    constructor (name, x, y, width, height) {
        this.name = name;
        this.value = {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
};