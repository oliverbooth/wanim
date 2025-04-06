import { Point } from "../point.js";
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
    constructor(x = 0, y = 0, h = 10) {
        super(x, y);

        this.h = h;

        this.path = generateSquarePath(this.x, this.y, this.h);
        this.path.refine(32);
        this.renderPath();
    }
}

function generateSquarePath(cx: number, cy: number, h: number): WPath {
    const offsets = [
        [1, -1],
        [-1, -1],
        [-1, 1],
        [1, 1],
    ];

    const points = offsets.map(
        ([dx, dy]) => [cx + dx * h, cy + dy * h] as Point
    );
    const segments: [Point, Point, Point, Point][] = points.map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        return [point, point, nextPoint, nextPoint];
    });

    return new WPath(segments);
}
