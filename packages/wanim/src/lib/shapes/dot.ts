import { WObject } from "../wobject.js";

export class Dot extends WObject {
    constructor(x = 0, y = 0) {
        super(x, y);

        this.element.setAttribute("r", "0.1");
        this.setFill("white");
    }

    override createElement(): SVGPathElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "circle") as SVGPathElement;
    }
}
