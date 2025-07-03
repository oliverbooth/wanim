// see https://easings.net/#

export type EasingFunction = (t: number) => number;
export type EasingKey = keyof typeof EASINGS_TABLE;

export function evaluateEase(easing: EasingKey | EasingFunction, t: number): number {
    if (typeof easing === "function") {
        return easing(t);
    } else if (easing in EASINGS_TABLE) {
        return EASINGS_TABLE[easing](t);
    } else {
        throw new Error(`Unknown easing function: ${easing}`);
    }
}

const EASINGS_TABLE = {
    linear: (t) => t,

    inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    outSine: (t) => Math.sin((t * Math.PI) / 2),
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

    inQuad: (t) => t * t,
    outQuad: (t) => 1 - (1 - t) * (1 - t),
    inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),

    inCubic: (t) => t * t * t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),

    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),

    inQuint: (t) => t * t * t * t * t,
    outQuint: (t) => 1 - Math.pow(1 - t, 5),
    inOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),

    inExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inOutExpo: (t) =>
        t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,

    inCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    outCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    inOutCirc: (t) =>
        t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,

    inBack: (t) => t * t * (2.70158 * t - 1.70158),
    outBack: (t) => 1 + Math.pow(t - 1, 2) * (2.70158 * (t - 1) + 1.70158),
    inOutBack: (t) =>
        t < 0.5
            ? (2 * t * t * (2.5949095 * 2 * t - 1.70158)) / 2
            : (1 + Math.pow(2 * t - 2, 2) * (2.5949095 * (2 * t - 2) + 1.70158)) / 2,

    inElastic: (t) => {
        const c = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c);
    },
    outElastic: (t) => {
        const c = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c) + 1;
    },
    inOutElastic: (t) => {
        const c = (2 * Math.PI) / 4.5;
        return t === 0
            ? 0
            : t === 1
              ? 1
              : t < 0.5
                ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c)) / 2
                : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c)) / 2 + 1;
    },
} satisfies Record<string, EasingFunction>;
