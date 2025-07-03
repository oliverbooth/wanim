import { Point } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class Star extends WPathObject {
    public r: number;
    public n: number;

    constructor(x = 0, y = 0, n = 5, r = 1) {
        super(x, y);

        this.n = n;
        this.r = r;

        this.path = generateStar(0, 0, n, r);
        this.renderPath();
    }
}

function generateStar(cx: number, cy: number, n: number, r: number): WPath {
    const angleStep = (2 * Math.PI) / (2 * n);

    const points: Point[] = [];

    for (let i = 0; i < 2 * n; i++) {
        const isInner = i % 2 === 1;
        const theta = -i * angleStep - Math.PI / 2;
        const magnitude = isInner ? r * 0.5 : r;

        const x = cx + magnitude * Math.cos(theta);
        const y = cy + magnitude * Math.sin(theta);

        points.push([x, y]);
    }

    return WPath.fromPoints(points);
}
