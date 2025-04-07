import { Point } from "../point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

/**
 * Represents a circle object.
 */
export class Circle extends WPathObject {
    public r: number;

    /**
     * Creates a new square instance with specified radius.
     */
    constructor(x = 0, y = 0, r = 10) {
        super(x, y);

        this.r = r;

        this.path = generateCirclePath(this.x, this.y, this.r, 4);
        this.path.refine(32);
        this.renderPath();
    }
}

function generateCirclePath(cx: number, cy: number, r: number, segments: number): WPath {
    const angleStep = (2 * Math.PI) / segments;
    const k = (4 / 3) * Math.tan(angleStep / 4);

    const points: [Point, Point, Point, Point][] = [];

    for (let i = 0; i < segments; i++) {
        const theta1 = -i * angleStep;
        const theta2 = -(i + 1) * angleStep;

        const x1 = cx + r * Math.cos(theta1);
        const y1 = cy + r * Math.sin(theta1);
        const x2 = cx + r * Math.cos(theta2);
        const y2 = cy + r * Math.sin(theta2);

        const cp1x = x1 + k * r * Math.sin(theta1);
        const cp1y = y1 - k * r * Math.cos(theta1);
        const cp2x = x2 - k * r * Math.sin(theta2);
        const cp2y = y2 + k * r * Math.cos(theta2);

        points.push([
            [x1, y1],
            [cp1x, cp1y],
            [cp2x, cp2y],
            [x2, y2],
        ]);
    }

    return new WPath(points);
}
