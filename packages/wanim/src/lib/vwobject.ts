import { WObject } from "./wobject.js";

export abstract class VWObject<
    T extends SVGGeometryElement = SVGGeometryElement
> extends WObject {
    public element!: T;

    // constructor() {}

    setFill(color: string, opacity?: number) {
        this.element.setAttribute("fill", color);

        if (typeof opacity !== "undefined")
            this.element.setAttribute("fill-opacity", opacity.toString());
    }
}
