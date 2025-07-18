import { WTween, tween } from "../tweens/wtween.js";
import { WPathObject } from "../wpathobject.js";

/**
 * Creates an "exit" animation for a {@link WPathObject}, by animating the length of the path to be zero.
 * @param obj The object to perform the animation on.
 */
export function Uncreate(obj: WPathObject): WTween {
    const path = obj.path.clone();
    const pathLength = path.getLength();

    return tween()
        .onPlay(() => obj.show())
        .onComplete(() => obj.hide())
        .onUpdate((t) => {
            obj.path = path.truncate((1 - t) * pathLength);
            obj.renderPath();
        })
        .duration(0.5);
}
