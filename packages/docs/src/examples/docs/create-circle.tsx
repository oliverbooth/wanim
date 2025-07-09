import { Circle, Create, WanimScene } from "wanim";

import { WanimSceneExample } from "@/components/wanim-scene-example";

class CreateCircle extends WanimScene {
    async run() {
        const circle = this.add(new Circle(0, 0, 2));
        circle.stroke("#ec6e74");
        circle.fill("#68245f");
        await this.play(Create(circle));
    }
}

export function CreateCircleExample() {
    return <WanimSceneExample scene={CreateCircle} />;
}
