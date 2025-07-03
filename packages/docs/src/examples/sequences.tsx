import { Square, WanimScene, sequence } from "wanim";

import { WanimSceneExample } from "../components/wanim-scene-example";

class Sequences extends WanimScene {
    async run() {
        const square = this.add(new Square(-2, 0, 2));
        square.setFill("red");
        square.scale = [0, 0];
        square.show();

        await this.play(
            sequence()
                .append(square.animate.scale([1, 1], 1).ease("outElastic"))
                .wait(0.5)
                .append(square.animate.x(2, 1).ease("inOutSine"))
                .append(square.animate.scale([0, 0], 1).ease("inOutSine"))
                .join(square.animate.rotate(180, 1).ease("inOutSine")),
        );
    }
}

export function SequencesExample() {
    return <WanimSceneExample scene={Sequences} />;
}
