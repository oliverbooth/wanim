import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

/**
 * Represents a square object.
 */
export class Square extends WPathObject {
    public h: number;

    /**
     * Creates a new square instance with specified half-width.
     */
    constructor(x = 0, y = 0, h = 1) {
        super(x, y);

        this.h = h;

        this.path = WPath.fromPoints([
            [h, -h],
            [-h, -h],
            [-h, h],
            [h, h],
        ]);
        this.renderPath();
    }
}
