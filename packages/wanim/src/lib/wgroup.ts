import { ColorInstance, ColorLike } from "color";

import { Vector2 } from "./geometry/point.js";
import { WObject } from "./wobject.js";

export class WGroup extends WObject<SVGGElement> {
    children: WObject[] = [];

    override createElement(): SVGGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "g") as SVGGElement;
    }

    override get size(): Vector2 {
        const rect = (this.element as unknown as SVGGraphicsElement).getBBox();
        return [rect.width, rect.height];
    }

    add(...objects: WObject[]): WGroup {
        this.children.push(...objects);
        for (const object of objects) {
            this.element.appendChild(object.element);
        }

        return this;
    }

    override fill(): ColorInstance;
    override fill(color: ColorLike): this;
    override fill(color?: ColorLike): ColorInstance | this {
        if (color !== undefined) {
            super.fill(color);
            for (const child of this.children) {
                child.fill(color);
            }
            return this;
        } else {
            return super.fill();
        }
    }

    override fillOpacity(): number;
    override fillOpacity(value: number): this;
    override fillOpacity(value?: number): number | this {
        if (value !== undefined) {
            super.fillOpacity(value);
            for (const child of this.children) {
                child.fillOpacity(value);
            }
            return this;
        } else {
            return super.fillOpacity();
        }
    }

    override stroke(): ColorInstance;
    override stroke(color: ColorLike): this;
    override stroke(color?: ColorLike): ColorInstance | this {
        if (color !== undefined) {
            super.stroke(color);
            for (const child of this.children) {
                child.stroke(color);
            }
            return this;
        } else {
            return super.stroke();
        }
    }

    override strokeWidth(): number;
    override strokeWidth(value: number): this;
    override strokeWidth(value?: number): number | this {
        if (value !== undefined) {
            super.strokeWidth(value);
            for (const child of this.children) {
                child.strokeWidth(value);
            }
            return this;
        } else {
            return super.strokeWidth();
        }
    }

    override strokeOpacity(): number;
    override strokeOpacity(value: number): this;
    override strokeOpacity(value?: number): number | this {
        if (value !== undefined) {
            super.strokeOpacity(value);
            for (const child of this.children) {
                child.strokeOpacity(value);
            }
            return this;
        } else {
            return super.strokeOpacity();
        }
    }

    override show(): void {
        super.show();
        for (const child of this.children) {
            child.show();
        }
    }

    override hide(): void {
        super.hide();
        for (const child of this.children) {
            child.hide();
        }
    }
}
