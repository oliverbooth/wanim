import { Point } from "../point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class RegularNgon extends WPathObject {
    public r: number;
    public n: number;

    constructor(x = 0, y = 0, n = 5, r = 1) {
        super(x, y);

        this.n = n;
        this.r = r;

        this.path = generateRegularNgon(0, 0, n, r);
        this.renderPath();
    }
}

function generateRegularNgon(cx: number, cy: number, n: number, r: number): WPath {
    const angleStep = (2 * Math.PI) / n;

    const points: Point[] = [];

    for (let i = 0; i < n; i++) {
        const theta = -i * angleStep - Math.PI / 2;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        points.push([x, y]);
    }

    return WPath.fromPoints(points);
}
