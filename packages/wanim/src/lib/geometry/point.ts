import { MathArray } from "mathjs";

import { lerp } from "../math.js";
import { Tuple } from "../types.js";

/**
 * Represents a point as a tuple of numbers.
 */
export type Vector2 = Tuple<number>;

export function lerpVector(a: Vector2, b: Vector2, t: number): Vector2;
export function lerpVector(a: number[], b: number[], t: number): MathArray {
    if (a.length !== b.length) {
        throw new Error("Points must have the same dimension.");
    }
    return a.map((_, i) => lerp(a[i], b[i], t));
}
