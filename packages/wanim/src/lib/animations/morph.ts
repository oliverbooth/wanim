import { WPathObject } from "../wpathobject.js";
import { WTween } from "../wtween.js";

/**
 * Creates an animation which morphs a {@link WPathObject} into another.
 * Note that this actually mutates {a and then reveals b and hides a once done.
 */
export function Morph(a: WPathObject, b: WPathObject): WTween {
    const aPath = a.path.clone();
    const bPath = b.path.clone();

    const res = Math.max(16, aPath.segments.length, bPath.segments.length);
    aPath.refine(res);
    bPath.refine(res);

    // const makeInterpolator = (attr: string, def: string) =>
    //     interpolate([0, 1], [a.element.getAttribute(attr) || def, b.element.getAttribute(attr) || def]);

    // const interpolaters = {
    //     fill: makeInterpolator("fill", "#00000000"),
    //     "fill-opacity": makeInterpolator("fill-opacity", "1"),
    //     stroke: makeInterpolator("stroke", "#00000000"),
    // };

    return new WTween({
        onUpdate: (t) => {
            // TODO: this only really looks good if the points are already close to each other.
            // maybe we could otherwise offset the path so points are close? naively that would be O(n^2).
            a.path = aPath.interpolate(bPath, t);
            a.renderPath();

            // for (const [attr, interpolater] of Object.entries(interpolaters)) {
            //     a.element.setAttribute(attr, interpolater(t));
            // }
        },
        onComplete: () => {
            a.hide();
            b.show();
        },
        duration: 0.5,
    });
}
