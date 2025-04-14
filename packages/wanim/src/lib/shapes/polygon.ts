import { Point } from "../point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Polygon extends WPathObject {
    points: Point[];

    constructor(x = 0, y = 0, points: Point[] = []) {
        super(x, y);

        this.points = points;

        this.path = WPath.fromPoints(points);
        this.renderPath();
    }
}
