import { WanimScene } from "./scene.js";

type Container = string | HTMLElement;

export function wanim(scene: WanimScene, container?: Container): void {
    console.log("wanim called on", scene, container);

    if (!container) {
        container = document.createElement("div");
        container.style.cssText = "position: fixed; left: 0; top: 0; width: 100dvw; height: 100dvh";
        document.body.appendChild(container);
    }

    console.log("initialized wanim!");
}
