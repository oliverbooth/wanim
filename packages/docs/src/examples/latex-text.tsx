import { Create, WTex, WanimScene } from "wanim";

import { WanimSceneExample } from "../components/wanim-scene-example";

class LaTeX extends WanimScene {
    async run() {
        const tex = this.add(new WTex("f(z) = \\frac{1}{2 \\pi i} \\oint_C \\frac{f(\\zeta)}{\\zeta - z} \\, d\\zeta"));
        await tex.rendered;
        await this.play(Create(tex));
    }
}

export function LaTeXExample() {
    return <WanimSceneExample scene={LaTeX} />;
}
