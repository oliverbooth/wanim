import { Vector2 } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Polygon extends WPathObject {
    points: Vector2[];

    constructor(x = 0, y = 0, points: Vector2[] = []) {
        super(x, y);

        this.points = points;
        this.path = WPath.fromPoints(points);

        this.renderPath();
    }
}
