import { Circle, Create, WanimScene } from "wanim";

import { WanimSceneExample } from "../components/wanim-scene-example";

class CreateCircle extends WanimScene {
    async run() {
        const circle = this.add(new Circle(0, 0, 2));
        circle.fill = "pink";
        await this.play(Create(circle));
    }
}

export function CreateCircleExample() {
    return <WanimSceneExample scene={CreateCircle} />;
}
