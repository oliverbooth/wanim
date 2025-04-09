import { Circle, Dot, Line, RegularNgon, Square, Star, WanimScene, WPathObject } from "wanim";
import { WanimSceneExample } from "../components/wanim-scene-example";

class Shapes extends WanimScene {
    async run() {
        const shapes = [
            new Circle(-3, -3),
            new Square(0, -3),
            new Line([2, -2.5], [4, -3.5]),
            new RegularNgon(-3, 0, 5),
            new Star(0, 0, 5),
            new Dot(3, 0),
        ];
        const colors = ["pink", "blue", "red", "orange", "yellow", "gray"];

        for (let i = 0; i < shapes.length; i++) {
            this.add(shapes[i]);

            shapes[i].show();
            shapes[i].setFill(colors[i], 1);
        }
    }
}

export function ShapesExample() {
    return <WanimSceneExample scene={Shapes} />;
}
