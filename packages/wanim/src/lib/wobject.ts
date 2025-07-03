import { Anchor, anchorToPoint } from "./geometry/anchors.js";
import { Point } from "./geometry/point.js";
import { WObjectAnimator, makeWObjectAnimator } from "./tweens/wobjectanimator.js";

/**
 * The base class for objects used in wanim's animations.
 */
export abstract class WObject<T extends SVGElement = SVGElement> {
    /**
     * The DOM element that represents the object's visual.
     */
    public element: T;
    public animate: WObjectAnimator = makeWObjectAnimator(this);

    private _x: number = 0;
    private _y: number = 0;
    private _scaleX: number = 1;
    private _scaleY: number = 1;
    private _rotate: number = 0;
    private _anchor: Anchor = Anchor.Center;

    public get x(): number {
        return this._x;
    }
    public set x(x: number) {
        this._x = x;
        this.updateTransform();
    }

    public get y(): number {
        return this._y;
    }
    public set y(y: number) {
        this._y = y;
        this.updateTransform();
    }

    public set position(position: Point) {
        this._x = position[0];
        this._y = position[1];
        this.updateTransform();
    }
    public get position(): Point {
        return [this._x, this._y];
    }

    public get scaleX(): number {
        return this._scaleX;
    }
    public set scaleX(scaleX: number) {
        this._scaleX = scaleX;
        this.updateTransform();
    }

    public get scaleY(): number {
        return this._scaleY;
    }
    public set scaleY(scaleY: number) {
        this._scaleY = scaleY;
        this.updateTransform();
    }

    public get scale(): Point {
        return [this._scaleX, this._scaleY];
    }
    public set scale(scale: Point) {
        this._scaleX = scale[0];
        this._scaleY = scale[1];
        this.updateTransform();
    }

    public get rotate(): number {
        return this._rotate;
    }
    public set rotate(rotate: number) {
        this._rotate = rotate;
        this.updateTransform();
    }

    public get anchor(): Anchor {
        return this._anchor;
    }
    public set anchor(anchor: Anchor) {
        this._anchor = anchor;
        this.updateTransform();
    }

    public get size(): Point {
        return [0, 0]; // This should be overridden by subclasses to return the actual size of the object.
    }

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(visible: boolean) {
        this._visible = visible;
        if (visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    private _visible: boolean = true;

    constructor(x = 0, y = 0) {
        this.element = this.createElement();

        this._x = x;
        this._y = y;
    }

    abstract createElement(): T;

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

        if (typeof opacity !== "undefined") this.element.setAttribute("fill-opacity", opacity.toString());
    }

    setStroke(color: string) {
        this.element.setAttribute("stroke", color);
    }
    setStrokeWidth(width: number) {
        this.element.setAttribute("stroke-width", width.toString());
    }

    updateTransform() {
        const anchorPoint = anchorToPoint(this._anchor);

        let size = this.size;

        this.element.setAttribute(
            "transform",
            [
                `translate(${-anchorPoint[0] * size[0]}, ${-anchorPoint[1] * size[1]})`,
                `translate(${this._x}, ${this._y})`,
                `scale(${this._scaleX}, ${this._scaleY})`,
                `rotate(${this._rotate})`,
            ].join(" "),
        );
        this.element.setAttribute("transform-origin", `${anchorPoint[0] * size[0]} ${anchorPoint[1] * size[1]}`);
    }
}
