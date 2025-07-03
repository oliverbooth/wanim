import { Point } from "./point.js";

export enum Anchor {
    TopLeft = "top-left",
    TopCenter = "top-center",
    TopRight = "top-right",
    CenterLeft = "center-left",
    Center = "center",
    CenterRight = "center-right",
    BottomLeft = "bottom-left",
    BottomCenter = "bottom-center",
    BottomRight = "bottom-right",
}

export function anchorToPoint(anchor: Anchor): Point {
    switch (anchor) {
        case Anchor.TopLeft:
            return [0, 0];
        case Anchor.TopCenter:
            return [0.5, 0];
        case Anchor.TopRight:
            return [1, 0];
        case Anchor.CenterLeft:
            return [0, 0.5];
        case Anchor.Center:
            return [0.5, 0.5];
        case Anchor.CenterRight:
            return [1, 0.5];
        case Anchor.BottomLeft:
            return [0, 1];
        case Anchor.BottomCenter:
            return [0.5, 1];
        case Anchor.BottomRight:
            return [1, 1];
    }
}
