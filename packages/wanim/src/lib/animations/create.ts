import { WPathObject } from "../wpathobject.js";
import { WTween } from "../wtween.js";

/**
 * Creates an "entry" animation for a {@link WPathObject}, by animating the length of the path.
 * @param obj The object to perform the animation on.
 */
export function Create(obj: WPathObject): WTween {
    const path = obj.path.clone();
    const pathLength = path.getLength();

    return new WTween({
        onPlay: () => {
            obj.show();
        },
        onUpdate: (t) => {
            obj.path = path.truncate(t * pathLength);
            obj.renderPath();
        },
        duration: 0.5,
    });
}
