/**
 * Linearly interpolates from a to b by t.
 */
export function lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
}
