import { Circle, RegularNgon, Square, WGroup, WTex, WanimScene } from "wanim";

import { WanimSceneExample } from "@/components/wanim-scene-example";
import { extractExampleSource } from "@/lib/extract-example-source";

import code from "./wanim-logo?raw";

class WanimLogo extends WanimScene {
    async run() {
        this.background = "#ece6e2";

        const w = new WTex("\\mathbb{W}", { fontScale: 2.5 });
        await w.rendered;
        w.position([-2, -1]);
        w.fill("#343434");
        w.stroke("transparent");
        w.show();

        const circle = new Circle(-1, 0);
        circle.fill("#87c2a5");
        circle.show();

        const square = new Square(0, -1, 2);
        square.fill("#525893");
        square.show();

        const triangle = new RegularNgon(1, 0, 3, 1);
        triangle.fill("#e07a5f");
        triangle.show();

        const logo = this.add(new WGroup());
        logo.add(triangle, square, circle, w); // order matters!
    }
}

export function WanimLogoExample() {
    return (
        <WanimSceneExample
            scene={WanimLogo}
            id="wanimlogo"
            title="WanimLogo"
            code={extractExampleSource(code)}
            tags={["TeX", "Shapes"]}
        />
    );
}
