import { Anchor } from "./geometry/anchors.js";
import { tex2svg } from "./latex.js";
import { Rectangle } from "./shapes/rectangle.js";
import { WGroup } from "./wgroup.js";
import { WPathObject } from "./wpathobject.js";

interface WTexOptions {
    fontScale: number;
}

export class WTex extends WGroup {
    rendered: Promise<void>;

    constructor(text: string, options?: WTexOptions) {
        super(0, 0);

        options = {
            fontScale: 1.5,
            ...options,
        };

        this.fill("white");
        this.rendered = new Promise((resolve) => {
            tex2svg(text).then((svg) => {
                const viewBox = svg.getAttribute("viewBox")!;
                const [minX, minY, , height] = viewBox.split(" ").map(Number);
                const scaleFactor = options.fontScale / height;

                const [offsetX, offsetY] = [minX * scaleFactor, minY * scaleFactor];

                const traverse = (
                    node: Node,
                    translateX: number,
                    translateY: number,
                    scaleX: number,
                    scaleY: number,
                ) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const element = node as Element;
                        if (element.tagName === "g") {
                            const transform = element.getAttribute("transform");
                            const scale = element.getAttribute("transform");

                            if (scale) {
                                const match = scale.match(/scale\(([^,]+),([^)]+)\)/);
                                if (match) {
                                    scaleX *= parseFloat(match[1]);
                                    scaleY *= parseFloat(match[2]);
                                }
                            }
                            if (transform) {
                                const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
                                if (match) {
                                    translateX += parseFloat(match[1]) * scaleFactor * scaleX;
                                    translateY += parseFloat(match[2]) * scaleFactor * scaleY;
                                }
                            }

                            element.setAttribute(
                                "transform",
                                `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`,
                            );
                        } else if (element.tagName === "path") {
                            const d = element.getAttribute("d")!;
                            const newD = d.replace(/([0-9.-]+)/g, (match) => {
                                const num = parseFloat(match);
                                return (num * scaleFactor).toFixed(6);
                            });
                            element.setAttribute("d", newD);

                            const transform = element.getAttribute("transform");
                            const scale = element.getAttribute("transform");

                            if (scale) {
                                const match = scale.match(/scale\(([^,]+),([^)]+)\)/);
                                if (match) {
                                    scaleX *= parseFloat(match[1]);
                                    scaleY *= parseFloat(match[2]);
                                }
                            }
                            if (transform) {
                                const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
                                if (match) {
                                    translateX += parseFloat(match[1]) * scaleFactor * scaleX;
                                    translateY += parseFloat(match[2]) * scaleFactor * scaleY;
                                }
                            }

                            try {
                                const wpath = WPathObject.fromSVGPath(element.getAttribute("d")!)
                                    .position([translateX, translateY])
                                    .scale([scaleX, scaleY])
                                    .fill(this.fill());
                                this.add(wpath);
                            } catch (e) {
                                console.error(e);
                            }

                            return;
                        } else if (element.tagName === "rect") {
                            const w = parseFloat(element.getAttribute("width")!) * scaleFactor * scaleX;
                            const h = parseFloat(element.getAttribute("height")!) * scaleFactor * scaleY;
                            const x = parseFloat(element.getAttribute("x")!) * scaleFactor * scaleX + translateX;
                            const y = parseFloat(element.getAttribute("y")!) * scaleFactor * scaleY + translateY;

                            const rect = new Rectangle(x, y, w, h).fill(this.fill()).anchor(Anchor.TopLeft);
                            this.add(rect);
                        }
                    }

                    node.childNodes.forEach((child) => {
                        traverse(child, translateX, translateY, scaleX, scaleY);
                    });
                };

                traverse(svg, -offsetX, -offsetY, 1, 1);
                window.requestAnimationFrame(() => this.updateTransform());

                resolve();
            });
        });
    }

    override createElement(): SVGGElement {
        return document.createElementNS("http://www.w3.org/2000/svg", "g") as SVGGElement;
    }
}
