import { EasingFunction, EasingKey, evaluateEase } from "./easings.js";
import { WTweenLike } from "./wtweenlike.js";

export class WTween extends WTweenLike {
    protected _runtime: number = 0;

    protected _duration: number = 1;
    protected _ease: EasingKey | EasingFunction = "linear";

    duration(duration: number): this {
        this._duration = duration;
        return this;
    }
    ease(ease: EasingKey | EasingFunction): this {
        this._ease = ease;
        return this;
    }

    override update(delta: number) {
        if (!this._running) return;

        this._runtime += delta;
        this._runtime = Math.min(this._runtime, this._duration);

        const progress = this._runtime / this._duration;

        const eased = evaluateEase(this._ease, progress);
        this._onUpdate?.(eased);

        if (this._runtime >= this._duration) {
            this.complete();
        }
    }
}

export function tween() {
    return new WTween();
}
