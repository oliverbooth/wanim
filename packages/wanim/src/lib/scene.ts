import { animate, AnimationSequence } from "motion";
import { WAnimation } from "./animations/index.js";
import { VWObject } from "./vwobject.js";

export abstract class WanimScene {
    objects: VWObject[] = [];
    animations: AnimationSequence = [];

    abstract construct(): void;

    play(animation: WAnimation): void {
        // noop
        this.animations.push(animation);
    }

    add<T extends VWObject>(vwObject: T): T {
        this.objects.push(vwObject);
        return vwObject;
    }

    animate() {
        return animate(this.animations);
    }
}
