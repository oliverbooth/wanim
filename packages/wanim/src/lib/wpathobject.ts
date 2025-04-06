import { WObject } from "./wobject.js";
import { WPath } from "./wpath.js";

/**
 * Represents an object that is defined by an SVG path.
 */
export class WPathObject extends WObject<SVGPathElement> {
    /**
     * The path defining the object.
     */
    path: WPath;

    constructor(x = 0, y = 0) {
        super(x, y);

        this.path = new WPath();
        this.element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        ) as SVGPathElement;

        this.element.setAttribute("stroke", "white");
        this.element.setAttribute("stroke-width", "1");
        this.element.setAttribute("stroke-linecap", "round");

        this.element.setAttribute("fill-rule", "evenodd");

        this.hide();
    }

    /**
     * Sets the DOM elements path definition to the current path's definition.
     */
    renderPath() {
        this.element.setAttribute("d", this.path.getPathDefinition());
    }
}
