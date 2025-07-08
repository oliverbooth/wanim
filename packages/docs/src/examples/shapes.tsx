import { Circle, Dot, Line, RegularNgon, Square, Star, WanimScene } from "wanim";

import { WanimSceneExample } from "../components/wanim-scene-example";
import { extractExampleSource } from "../lib/extract-example-source";
import code from "./shapes?raw";

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
        const colors = ["#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94", "white"];

        for (let i = 0; i < shapes.length; i++) {
            this.add(shapes[i]);

            shapes[i].show();
            shapes[i].fill = colors[i];
        }
    }
}

export function ShapesExample() {
    return <WanimSceneExample scene={Shapes} source={extractExampleSource(code)} />;
}
