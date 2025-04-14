import { WObject } from "./wobject.js";

export class WGroup extends WObject<SVGGElement> {
    children: WObject[] = [];

    override createElement(): SVGGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "g") as SVGGElement;
    }

    add(object: WObject): WGroup {
        this.children.push(object);
        this.element.appendChild(object.element);

        return this;
    }
}
