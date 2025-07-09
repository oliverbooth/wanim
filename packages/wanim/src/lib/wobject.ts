import Color, { ColorInstance, ColorLike } from "color";

import { Anchor, anchorToPoint } from "./geometry/anchors.js";
import { Vector2 } from "./geometry/point.js";
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

    private _fill: ColorInstance = Color("transparent");
    private _stroke: ColorInstance = Color("transparent");
    private _strokeWidth: number = 0.1;

    private _visible = false;

    public x(): number;
    public x(value: number): this;
    public x(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._x = value;
            this.updateTransform();
            return this;
        } else {
            return this._x;
        }
    }

    public y(): number;
    public y(value: number): this;
    public y(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._y = value;
            this.updateTransform();
            return this;
        } else {
            return this._y;
        }
    }

    public position(): Vector2;
    public position(value: Vector2): this;
    public position(value?: Vector2): Vector2 | this {
        if (typeof value !== "undefined") {
            [this._x, this._y] = value;
            this.updateTransform();
            return this;
        } else {
            return [this._x, this._y];
        }
    }

    public fill(): ColorInstance;
    public fill(color: ColorLike): this;
    public fill(color?: ColorLike): ColorInstance | this {
        if (typeof color !== "undefined") {
            this._fill = Color(color);
            this.updateFill();
            return this;
        } else {
            return this._fill;
        }
    }

    public fillOpacity(): number;
    public fillOpacity(value: number): this;
    public fillOpacity(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._fill = this._fill.alpha(value);
            this.updateFill();
            return this;
        } else {
            return this._fill.alpha();
        }
    }

    public stroke(): ColorInstance;
    public stroke(color: ColorLike): this;
    public stroke(color?: ColorLike): ColorInstance | this {
        if (typeof color !== "undefined") {
            this._stroke = Color(color);
            this.updateStroke();
            return this;
        } else {
            return this._stroke;
        }
    }

    public strokeOpacity(): number;
    public strokeOpacity(value: number): this;
    public strokeOpacity(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._stroke = this._stroke.alpha(value);
            this.updateStroke();
            return this;
        } else {
            return this._stroke.alpha();
        }
    }

    public strokeWidth(): number;
    public strokeWidth(value: number): this;
    public strokeWidth(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._strokeWidth = value;
            this.updateStroke();
            return this;
        } else {
            return this._strokeWidth;
        }
    }

    public scaleX(): number;
    public scaleX(value: number): this;
    public scaleX(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._scaleX = value;
            this.updateTransform();
            return this;
        } else {
            return this._scaleX;
        }
    }

    public scaleY(): number;
    public scaleY(value: number): this;
    public scaleY(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._scaleY = value;
            this.updateTransform();
            return this;
        } else {
            return this._scaleY;
        }
    }

    public scale(): Vector2;
    public scale(value: Vector2): this;
    public scale(value?: Vector2): Vector2 | this {
        if (typeof value !== "undefined") {
            [this._scaleX, this._scaleY] = value;
            this.updateTransform();
            return this;
        } else {
            return [this._scaleX, this._scaleY];
        }
    }

    public rotate(): number;
    public rotate(value: number): this;
    public rotate(value?: number): number | this {
        if (typeof value !== "undefined") {
            this._rotate = value;
            this.updateTransform();
            return this;
        } else {
            return this._rotate;
        }
    }

    public anchor(): Anchor;
    public anchor(value: Anchor): this;
    public anchor(value?: Anchor): Anchor | this {
        if (typeof value !== "undefined") {
            this._anchor = value;
            this.updateTransform();
            return this;
        } else {
            return this._anchor;
        }
    }

    public get visible() {
        return this._visible;
    }
    public set visible(v: boolean) {
        this._visible = v;
        this.element.setAttribute("visibility", v ? "visible" : "hidden");
    }

    public get size(): Vector2 {
        return [0, 0]; // This should be overridden by subclasses to return the actual size of the object.
    }

    constructor(x = 0, y = 0) {
        this.element = this.createElement();

        this._x = x;
        this._y = y;
    }

    abstract createElement(): T;

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    updateTransform() {
        const anchorPoint = anchorToPoint(this._anchor);
        const size = this.size;

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

    updateStroke() {
        this.element.setAttribute("stroke", this.stroke().hex());
        this.element.setAttribute("stroke-opacity", this.strokeOpacity().toString());
        this.element.setAttribute("stroke-width", this.strokeWidth().toString());
    }

    updateFill() {
        this.element.setAttribute("fill", this.fill().hex());
        this.element.setAttribute("fill-opacity", this.fillOpacity().toString());
    }
}
