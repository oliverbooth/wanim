import Color, { ColorInstance } from "color";

import { lerp } from "../math.js";
import { WTween } from "./wtween.js";

type TweenerGetter<T> = () => T;
type TweenerSetter<T> = (value: T) => void;

export class WTweener<T> extends WTween {
    public target: T;
    public start?: T;

    constructor(
        private get: TweenerGetter<T>,
        private set: TweenerSetter<T>,
        _target: T,
    ) {
        super();

        const interpolator = getInterpolator(_target);

        this.target = _target;
        this.onPlay(() => {
            if (!this.start) {
                this.start = this.get();
            }
        });
        this.onUpdate((progress) => {
            const currentValue = interpolator(this.start!, this.target, progress);
            this.set(currentValue);
        });
    }

    override update(delta: number): void {
        super.update(delta);
    }
}

type Interpolator<T> = (start: T, target: T, progress: number) => T;

function getInterpolator<T>(target: T): Interpolator<T> {
    if (typeof target === "number") {
        return ((start, target, progress) =>
            lerp(start, target, progress)) satisfies Interpolator<number> as unknown as Interpolator<T>;
    }
    if (target instanceof Color) {
        return ((start, target, progress) =>
            start.mix(target, progress)) satisfies Interpolator<ColorInstance> as unknown as Interpolator<T>;
    }

    if (Array.isArray(target)) {
        const interpolators = target.map(getInterpolator);
        return ((start, target, progress) => {
            // if (start.length !== target.length) throw new Error("Array lengths do not match");
            return start.map((value, index) => interpolators[index](value, target[index], progress));
        }) satisfies Interpolator<number[]> as unknown as Interpolator<T>;
    }

    throw new Error();
}

export function tweener<T>(get: () => T, set: (v: T) => void, target: T, duration: number): WTweener<T> {
    return new WTweener<T>(get, set, target).duration(duration);
}
