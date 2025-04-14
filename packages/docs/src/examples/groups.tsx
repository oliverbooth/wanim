import { Circle, Dot, Line, RegularNgon, WGroup, Square, Star, WanimScene, WPathObject } from "wanim";
import { WanimSceneExample } from "../components/wanim-scene-example";

class Groups extends WanimScene {
    async run() {
        const stars: Star[] = [];
        const group = new WGroup();
        this.add(group);

        for (let i = 0; i < 3; i++) {
            const star = new Star(-3 + i * 3, 0);
            star.show();
            stars.push(star);
            group.add(star);
        }
    }
}

export function GroupsExample() {
    return <WanimSceneExample scene={Groups} />;
}
