import { WObject } from "../wobject.js";
import { WTweener, tweener } from "./wtweener.js";

export type WObjectAnimator = ReturnType<typeof makeWObjectAnimator>;

export function makeWObjectAnimator(wobject: WObject) {
    return {
        x: makePropertyTweener("x", wobject),
        y: makePropertyTweener("y", wobject),
        position: makePropertyTweener("position", wobject),

        scaleX: makePropertyTweener("scaleX", wobject),
        scaleY: makePropertyTweener("scaleY", wobject),
        scale: makePropertyTweener("scale", wobject),

        rotate: makePropertyTweener("rotate", wobject),
    };
}

function makePropertyTweener<K extends keyof WObject>(
    prop: K,
    wobject: WObject,
): (v: WObject[K], duration: number) => WTweener<WObject[K]> {
    return (v, duration) =>
        tweener<WObject[K]>(
            () => wobject[prop],
            (value) => (wobject[prop] = value),
            v,
            duration,
        );
}
