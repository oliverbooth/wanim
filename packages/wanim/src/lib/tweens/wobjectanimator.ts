import Color, { ColorLike } from "color";

import { WObject } from "../wobject.js";
import { WTweener, tweener } from "./wtweener.js";

export type WObjectAnimator = ReturnType<typeof makeWObjectAnimator>;
export type TweenerFactory<K extends keyof WObject, S = WObject[K], V = WObject[K]> = (
    target: S,
    duration: number,
) => WTweener<WObject[K]>;

export function makeWObjectAnimator(wobject: WObject): {
    x: TweenerFactory<"x">;
    y: TweenerFactory<"y">;
    position: TweenerFactory<"position">;

    scaleX: TweenerFactory<"scaleX">;
    scaleY: TweenerFactory<"scaleY">;
    scale: TweenerFactory<"scale">;

    rotate: TweenerFactory<"rotate">;

    fill: TweenerFactory<"fill", ColorLike>;
} {
    return {
        x: makePropertyTweener("x", wobject),
        y: makePropertyTweener("y", wobject),
        position: makePropertyTweener("position", wobject),

        scaleX: makePropertyTweener("scaleX", wobject),
        scaleY: makePropertyTweener("scaleY", wobject),
        scale: makePropertyTweener("scale", wobject),

        rotate: makePropertyTweener("rotate", wobject),

        fill: makePropertyTweenerWithConversion("fill", wobject, (x: ColorLike) => Color(x)),
    };
}

function makePropertyTweener<K extends keyof WObject>(prop: K, wobject: WObject): TweenerFactory<K, WObject[K]> {
    return makePropertyTweenerWithConversion(prop, wobject, (x) => x);
}

function makePropertyTweenerWithConversion<K extends keyof WObject, S = WObject[K]>(
    prop: K,
    wobject: WObject,
    convert: (s: S) => WObject[K],
): TweenerFactory<K, S, WObject[K]> {
    return (target, duration) =>
        tweener<WObject[K]>(
            () => wobject[prop],
            (value) => (wobject[prop] = value),
            convert(target),
            duration,
        );
}
