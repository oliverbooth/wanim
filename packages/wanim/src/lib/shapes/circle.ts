import { VWObject } from "../vwobject.js";

export class Circle extends VWObject<SVGPathElement> {
    constructor(x = 0, y = 0, r = 10) {
        super();

        this.element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        ) as SVGPathElement;
        this.element.setAttribute(
            "d",
            `M ${x} ${y}
            m ${r}, 0
            a ${r},${r} 0 1,0 ${-r * 2},0
            a ${r},${r} 0 1,0 ${r * 2} ,0`
        );

        this.element.setAttribute("stroke", "white");
        this.element.setAttribute("stroke-width", "1");
        this.element.setAttribute("stroke-linecap", "round");

        this.element.setAttribute("fill-rule", "evenodd");
    }
}
