import { Vector2 } from "../geometry/point.js";
import { WPath } from "../wpath.js";
import { WPathObject } from "../wpathobject.js";

export class RegularNgon extends WPathObject {
    public n: number;
    public r: number;

    constructor(x = 0, y = 0, n = 5, r = 1) {
        super(x, y);

        this.n = n;
        this.r = r;
        this.path = generateRegularNgon(r, r, n, r);

        this.renderPath();
    }

    override get size(): Vector2 {
        return [this.r * 2, this.r * 2];
    }
}

function generateRegularNgon(cx: number, cy: number, n: number, r: number): WPath {
    const angleStep = (2 * Math.PI) / n;

    const points: Vector2[] = [];

    for (let i = 0; i < n; i++) {
        const theta = -i * angleStep - Math.PI / 2;

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        points.push([x, y]);
    }

    return WPath.fromPoints(points);
}
