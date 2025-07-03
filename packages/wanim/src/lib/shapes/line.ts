import { Point } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Line extends WPathObject {
    constructor(a: Point, b: Point) {
        super(0, 0);

        this.path = WPath.fromPoints([a, b]);

        this.renderPath();
        this.updateTransform();
    }
}
