import { Vector2 } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Line extends WPathObject {
    constructor(a: Vector2, b: Vector2) {
        super(0, 0);

        this.path = WPath.fromPoints([a, b]);

        this.renderPath();
        this.updateTransform();
    }
}
