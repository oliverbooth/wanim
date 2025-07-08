import { WTween, tween } from "../tweens/wtween.js";
import { WPathObject } from "../wpathobject.js";
import { WTex } from "../wtex.js";

/**
 * Creates an "entry" animation for a {@link WPathObject} or a group of them, by animating the length of the path.
 * @param obj The object to perform the animation on.
 */
export function Create(obj: WPathObject | WTex): WTween {
    if (obj instanceof WTex) {
        const children = obj.children.filter((child) => child instanceof WPathObject) as WPathObject[];
        if (children.length === 0) {
            throw new Error("Create animation can only be applied to groups containing WPathObjects.");
        }
        const childPathClones = children.map((child) => child.path.clone());
        const childPathLengths = children.map((child) => child.path.getLength());

        return tween()
            .onPlay(() => children.forEach((child) => child.show()))
            .onUpdate((t) => {
                if (t <= 0.5) {
                    const d = t * 2;
                    children.forEach((child, i) => {
                        child.path = childPathClones[i].truncate(d * childPathLengths[i]);
                        child.renderPath();
                    });
                } else {
                    const d = (t - 0.5) * 2;
                    children.forEach((child, i) => {
                        child.fill = "white";
                        child.fillOpacity = d;
                        child.strokeWidth = 0.05 * (1 - d);
                    });
                }
            })
            .duration(1);
    }
    if (obj instanceof WPathObject) {
        const path = obj.path.clone();
        const pathLength = path.getLength();

        return tween()
            .onPlay(() => obj.show())
            .onUpdate((t) => {
                obj.path = path.truncate(t * pathLength);
                obj.renderPath();
            })
            .duration(0.5);
    }

    throw new Error("");
}
