import Color, { ColorLike } from "color";

import { ReturnTypeWithArgs } from "../types.js";
import { WObject } from "../wobject.js";
import { WTweener, tweener } from "./wtweener.js";

type WObjectFunctionProperties = {
    [K in keyof WObject]: WObject[K] extends (...args: any[]) => any ? K : never;
}[keyof WObject];
type WObjectFunctionPropertyType<K extends WObjectFunctionProperties> = ReturnTypeWithArgs<WObject[K], []>;

export type WObjectAnimator = ReturnType<typeof makeWObjectAnimator>;
export type TweenerFactory<
    K extends WObjectFunctionProperties,
    S = WObjectFunctionPropertyType<K>,
    V = WObjectFunctionPropertyType<K>,
> = (target: S, duration: number) => WTweener<V>;

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

function makePropertyTweener<K extends WObjectFunctionProperties, V>(
    prop: K,
    wobject: WObject,
): TweenerFactory<K, V, V> {
    return makePropertyTweenerWithConversion(prop, wobject, (x) => x);
}

function makePropertyTweenerWithConversion<K extends WObjectFunctionProperties, S, V = WObjectFunctionPropertyType<K>>(
    prop: K,
    wobject: WObject,
    convert: (s: S) => V,
): TweenerFactory<K, S, V> {
    return (target, duration) =>
        tweener<V>(
            () => (wobject[prop] as unknown as () => V)(),
            (value) => (wobject[prop] as unknown as (v: V) => never)(value),
            convert(target),
            duration,
        );
}
