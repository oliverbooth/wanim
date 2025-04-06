/**
 * The base class for objects used in wanim's animations.
 */
export abstract class WObject<
    T extends SVGGeometryElement = SVGGeometryElement
> {
    /**
     * The DOM element that represents the object's visual.
     */
    public element!: T;

    public x = 0;
    public y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Hides the object by settings its opacity to zero.
     */
    hide() {
        this.element.setAttribute("opacity", "0");
    }

    /**
     * Shows the object by settings its opacity to one.
     */
    show() {
        this.element.setAttribute("opacity", "1");
    }

    /**
     * Sets the fill of the object, with an optional opacity. If fill transitions are meant to be used, then one cant specify the color by its name.
     */
    setFill(color: string, opacity?: number) {
        this.element.setAttribute("fill", color);

        if (typeof opacity !== "undefined")
            this.element.setAttribute("fill-opacity", opacity.toString());
    }
}
