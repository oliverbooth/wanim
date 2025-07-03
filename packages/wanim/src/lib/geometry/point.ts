import { lerp } from "../math.js";
import { Tuple } from "../types.js";

/**
 * Represents a point as a tuple of numbers.
 */
export type Point = Tuple<number>;

export function addPoints(p1: Point, p2: Point): Point {
    return [p1[0] + p2[0], p1[1] + p2[1]];
}

export function lerpPoints(a: Point, b: Point, t: number): Point {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}
