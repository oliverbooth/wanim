import { Vector2 } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

/**
 * Represents a square object.
 */
export class Rectangle extends WPathObject {
    public w: number;
    public h: number;

    /**
     * Creates a new rectangle of specified size.
     */
    constructor(x = 0, y = 0, w = 1, h = 1) {
        super(x, y);

        this.w = w;
        this.h = h;
        this.path = WPath.fromPoints([
            [0, 0],
            [w, 0],
            [w, h],
            [0, h],
        ]);

        this.renderPath();
    }

    override get size(): Vector2 {
        return [this.w, this.h];
    }
}
