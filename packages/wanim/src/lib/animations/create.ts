import { Circle } from "../shapes/circle.js";
import { VWObject } from "../vwobject.js";
import { WAnimation } from "./index.js";

export function Create(vwObject: VWObject): WAnimation {
    if (vwObject instanceof Circle) {
        const pathLength = vwObject.element.getTotalLength();

        return [
            vwObject.element,
            {
                fillOpacity: [
                    0,
                    Number(vwObject.element.getAttribute("fill-opacity")),
                ],
                pathLength: [0, 1],
            },
            { duration: 1, ease: [0.65, 0, 0.35, 1] },
        ];
    }

    throw new Error("unknown object for create animation");
}
