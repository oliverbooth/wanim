import Color, { ColorInstance, ColorLike } from "color";

import { WTweenLike } from "./tweens/wtweenlike.js";
import { WObject } from "./wobject.js";

/**
 * The base class for wanim animations. The {@link run} method essentially defines a script which the scene then performs.
 */
export abstract class WanimScene {
    /**
     * The objects contained in the scene.
     */
    objects: WObject[] = [];
    tweenLikes: WTweenLike[] = [];

    /**
     * The DOM SVG container. This can be expected to be populated by the time the scene runs.
     */
    container: SVGElement | null = null;

    private _background: ColorInstance = Color("black");

    public set background(color: ColorLike) {
        this._background = Color(color);
        this.container!.style.backgroundColor = this._background.hex();
    }

    abstract run(): void | Promise<void>;

    update(delta: number): void {
        for (const tween of this.tweenLikes) {
            tween.update(delta);
        }
    }

    play(tween: WTweenLike): WTweenLike {
        this.tweenLikes.push(tween);
        tween.play();

        return tween;
    }

    /**
     * Adds an object to the scene.
     */
    add<T extends WObject>(wobject: T): T {
        this.objects.push(wobject);

        if (this.container) {
            this.container.appendChild(wobject.element);

            // this is kind of needed to allow elements to be interactable by cursor, since the fullscreen container
            // disables pointer events.
            wobject.element.style.pointerEvents = "all";
        }

        return wobject;
    }
}
