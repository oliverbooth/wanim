import { Vector2 } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

/**
 * Represents a square object.
 */
export class Square extends WPathObject {
    public s: number;

    /**
     * Creates a new square instance with specified side length.
     */
    constructor(x = 0, y = 0, s = 1) {
        super(x, y);

        this.s = s;
        this.path = WPath.fromPoints([
            [0, 0],
            [s, 0],
            [s, s],
            [0, s],
        ]);

        this.renderPath();
        this.updateTransform();
    }

    override get size(): Vector2 {
        return [this.s, this.s];
    }
}
