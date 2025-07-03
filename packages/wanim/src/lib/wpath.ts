import clone from "clone";
import svgPathParser from "svg-path-parser";

import { Point, lerpPoints } from "./geometry/point.js";
import { Quadruple } from "./types.js";

export type CubicBezierPoints = Quadruple<Point>;

/**
 * Represents a dynamic SVG path implementation focused on dynamic path resolution.
 */
export class WPath {
    /**
     * The segments of the path.
     */
    segments: WPathSegment[];

    /**
     * Creates a path instance based on the specified cubic bezier definition.
     */
    constructor(points: CubicBezierPoints[] = []) {
        // TODO: we may also need some utility method to create a wpath from an existing path definition?
        this.segments = points.map((p) => new WPathSegment(p));
    }

    /**
     * Creates a deep clone of the path instance.
     */
    clone(): WPath {
        return new WPath(clone(this.getAllPoints()));
    }

    /**
     * Returns a new path that is a linear interpolation of the path against the specified path by t.
     */
    interpolate(other: WPath, t: number): WPath {
        const segments = this.segments.map((segment, i) => segment.interpolate(other.segments[i], t));

        return new WPath(segments.map((segment) => segment.points));
    }

    /**
     * Returns an (approximation) of the total path length.
     */
    getLength(): number {
        return this.segments.reduce((sum, segment) => sum + segment.getLength(), 0);
    }

    /**
     * Creates a new path from the current path instance, truncated to the specified (absolute) length.
     */
    truncate(maxLength: number): WPath {
        const totalLength = this.getLength();

        if (totalLength <= maxLength) {
            return this.clone();
        }

        let remainingLength = maxLength;
        const truncatedSegments: CubicBezierPoints[] = [];

        for (const segment of this.segments) {
            const segmentLength = segment.getLength();
            if (remainingLength < segmentLength) {
                const t = remainingLength / segmentLength;
                truncatedSegments.push(segment.split(t)[0].points);
                break;
            } else {
                truncatedSegments.push(segment.points);
                remainingLength -= segmentLength;
            }
        }

        return new WPath(truncatedSegments);
    }

    /**
     * Returns the cubic bezier definition points of the path.
     */
    getAllPoints(): CubicBezierPoints[] {
        return this.segments.map((segment) => segment.points);
    }

    /**
     * Returns the SVG path definition string.
     */
    getPathDefinition(): string {
        const p = 3;
        const fixedSegments = this.segments.map(
            (segment) =>
                segment.points.map((point) => point.map((coord) => coord.toFixed(p)).join(",")) as Quadruple<string>,
        );

        return (
            `M ${fixedSegments[0][0]} ` +
            fixedSegments.map((segment) => `C ${segment[1]} ${segment[2]} ${segment[3]}`).join(" ")
        );
    }

    /**
     * Refines the path to have the specified number of segments.
     *
     * Note that the specified number must be positive and may not be less than the current number of segments.
     * "Simplfying" into less segments may be added in the future.
     */
    refine(count: number): void {
        if (count <= 0) {
            throw new Error("The refine count must be a positive integer.");
        }

        if (count < this.segments.length) {
            throw new Error("Cannot refine to a count less than the number of segments (yet).");
        }

        let index = 0;
        while (this.segments.length < count) {
            const segment = this.segments[index];
            this.segments.splice(index, 1, ...segment.split());
            index += 2;

            if (index >= this.segments.length) {
                index = 0;
            }
        }
    }

    static fromSVGPath(pathDefintion: string): WPath {
        const { parseSVG, makeAbsolute } = svgPathParser;

        const def = makeAbsolute(parseSVG(pathDefintion));

        if (def.length < 1) {
            throw new Error("svg path is too short");
        }

        const head = def.shift()!;
        if (head.code !== "M") {
            throw new Error("svg path must start with a move instruction");
        }

        const points: CubicBezierPoints[] = [];

        let cursor: Point = [head.x, head.y];
        while (def.length > 0) {
            const inst = def.shift()!;
            switch (inst.code) {
                case "L":
                    points.push([cursor, cursor, [inst.x, inst.y], [inst.x, inst.y]]);
                    cursor = [inst.x, inst.y];
                    break;
                case "H":
                    points.push([cursor, cursor, [inst.x, cursor[1]], [inst.x, cursor[1]]]);
                    cursor = [inst.x, cursor[1]];
                    break;
                case "V":
                    points.push([cursor, cursor, [cursor[0], inst.y], [cursor[0], inst.y]]);
                    cursor = [cursor[0], inst.y];
                    break;
                case "T":
                    // TODO: this may not be correct?
                    points.push([cursor, cursor, [inst.x, inst.y], [inst.x, inst.y]]);
                    cursor = [inst.x, inst.y];
                    break;
                case "Q":
                    points.push([cursor, [inst.x1, inst.y1], [inst.x1, inst.y1], [inst.x, inst.y]]);
                    cursor = [inst.x, inst.y];
                    break;
                case "C":
                    points.push([cursor, [inst.x1, inst.y1], [inst.x2, inst.y2], [inst.x, inst.y]]);
                    cursor = [inst.x, inst.y];
                    break;
                case "Z":
                    points.push([cursor, cursor, [head.x, head.y], [head.x, head.y]]);
                    cursor = [head.x, head.y];
                    break;
                case "M":
                    // TODO: this may not be correct?
                    points.push([cursor, cursor, [inst.x, inst.y], [inst.x, inst.y]]);
                    cursor = [inst.x, inst.y];
                    break;

                default:
                    throw new Error(`unparseable instruction '${inst.code}'`);
            }
        }

        return new WPath(points);
    }

    static fromPoints(points: Point[]): WPath {
        if (points.length < 2) {
            return new WPath();
        }

        return new WPath(
            points
                .map((point, i) => [point, points[(i + 1) % points.length]])
                .map(([p0, p1]) => [p0, p0, p1, p1] as CubicBezierPoints),
        );
    }
}

/**
 * Represents a bezier curve segment in a {@link WPath}.
 */
export class WPathSegment {
    points: CubicBezierPoints;

    constructor(points: CubicBezierPoints) {
        this.points = points;
    }

    /**
     * Returns an approximation of the path length using a Gaussian quadrature.
     */
    getLength(): number {
        return bezierLengthGaussQuad(this.points);
    }

    /**
     * Returns a new segment that is a linear interpolation of the segment against the specified segment by t.
     */
    interpolate(other: WPathSegment, t: number): WPathSegment {
        return new WPathSegment(
            this.points.map((point, i) => lerpPoints(point, other.points[i], t)) as CubicBezierPoints,
        );
    }

    /**
     * Splits the bezier curve into two segments at {@param t} using De Casteljau's algorithm.
     *
     * @returns An array of two new {@link WPathSegment} instances.
     */
    split(t = 0.5): [WPathSegment, WPathSegment] {
        const [p0, p1, p2, p3] = this.points;

        const p01 = lerpPoints(p0, p1, t);
        const p12 = lerpPoints(p1, p2, t);
        const p23 = lerpPoints(p2, p3, t);

        const p012 = lerpPoints(p01, p12, t);
        const p123 = lerpPoints(p12, p23, t);

        const p0123 = lerpPoints(p012, p123, t);

        return [new WPathSegment([p0, p01, p012, p0123]), new WPathSegment([p0123, p123, p23, p3])];
    }
}

/**
 * Calculates the derivative of the specified cubic bezier at the specified value.
 */
function bezierDerivative(curve: CubicBezierPoints, t: number): Point {
    const [p0, p1, p2, p3] = curve;

    const ax = -3 * p0[0] + 9 * p1[0] - 9 * p2[0] + 3 * p3[0];
    const bx = 6 * p0[0] - 12 * p1[0] + 6 * p2[0];
    const cx = -3 * p0[0] + 3 * p1[0];

    const ay = -3 * p0[1] + 9 * p1[1] - 9 * p2[1] + 3 * p3[1];
    const by = 6 * p0[1] - 12 * p1[1] + 6 * p2[1];
    const cy = -3 * p0[1] + 3 * p1[1];

    const dx = ax * t * t + bx * t + cx;
    const dy = ay * t * t + by * t + cy;

    return [dx, dy];
}

/**
 * Calculates an approximation of the length of the cubic bezier curve using a gaussian quadrature.
 */
function bezierLengthGaussQuad(curve: CubicBezierPoints): number {
    // Weights and evaluation points for 5-point Gauss–Legendre
    const tValues = [0.04691008, 0.23076534, 0.5, 0.76923466, 0.95308992];
    const cValues = [0.11846344, 0.23931434, 0.28444444, 0.23931434, 0.11846344];

    let sum = 0;
    for (let i = 0; i < tValues.length; i++) {
        const d = bezierDerivative(curve, tValues[i]);
        sum += cValues[i] * Math.hypot(d[0], d[1]);
    }

    return sum;
}
