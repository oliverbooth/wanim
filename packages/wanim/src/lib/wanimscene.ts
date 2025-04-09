import { WObject } from "./wobject.js";
import { WTween } from "./wtween.js";

/**
 * The base class for wanim animations. The {@link run} method essentially defines a script which the scene then performs.
 */
export abstract class WanimScene {
    /**
     * The objects contained in the scene.
     */
    objects: WObject[] = [];
    tweens: WTween[] = [];

    /**
     * The DOM SVG container. This can be expected to be populated by the time the scene runs.
     */
    container: SVGElement | null = null;

    abstract run(): void | Promise<void>;

    update(delta: number): void {
        for (const tween of this.tweens) {
            tween.update(delta);
        }
    }

    play(tween: WTween): WTween {
        this.tweens.push(tween);
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
