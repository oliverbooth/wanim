import { animate } from "motion";
import { WPathObject } from "../wpathobject.js";
import { EASE_IN_OUT_CUBIC } from "../easings.js";
import { WAnimation } from "./types.js";

/**
 * Creates an "exit" animation for a {@link WPathObject}, by animating the length of the path to be zero.
 * @param obj The object to perform the animation on.
 */
export function Uncreate(obj: WPathObject): WAnimation {
    return async () => {
        const path = obj.path.clone();
        const pathLength = path.getLength();

        await animate(0, 1, {
            onPlay: () => {
                obj.show();
            },
            onComplete: () => {
                obj.hide();
            },
            onUpdate: (t) => {
                obj.path = path.truncate((1 - t) * pathLength);
                obj.renderPath();
            },
            duration: 0.5,
            ease: EASE_IN_OUT_CUBIC,
        });
    };
}
