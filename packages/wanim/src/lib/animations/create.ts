import { sequence } from "../tweens/wsequence.js";
import { tween } from "../tweens/wtween.js";
import { WTweenLike } from "../tweens/wtweenlike.js";
import { WPathObject } from "../wpathobject.js";
import { WTex } from "../wtex.js";

/**
 * Creates an "entry" animation for a {@link WPathObject} or a group of them, by animating the length of the path.
 * @param obj The object to perform the animation on.
 */
export function Create(obj: WPathObject | WTex): WTweenLike {
    if (obj instanceof WTex) {
        const children = obj.children.filter((child) => child instanceof WPathObject) as WPathObject[];
        if (children.length === 0) {
            throw new Error("Create animation can only be applied to groups containing WPathObjects.");
        }
        const childPathClones = children.map((child) => child.path.clone());
        const childPathLengths = children.map((child) => child.path.getLength());

        return sequence()
            .onPlay(() => {
                obj.fillOpacity(0);
                obj.stroke(obj.fill());
                obj.strokeWidth(0.05);
                obj.strokeOpacity(1);

                children.forEach((child) => child.show());
            })
            .onComplete(() => {})
            .append(
                tween()
                    .onUpdate((t) => {
                        console.log(1, t);
                        children.forEach((child, i) => {
                            child.path = childPathClones[i].truncate(t * childPathLengths[i]);
                            child.renderPath();
                        });
                    })
                    .duration(0.5),
            )
            .append(
                tween()
                    .onUpdate((t) => {
                        console.log(2, t);
                        children.forEach((child) => {
                            child.fillOpacity(t).strokeWidth(0.05 * (1 - t));
                        });
                    })
                    .duration(0.5),
            );
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
