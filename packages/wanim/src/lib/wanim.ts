import { WanimScene } from "./scene.js";

type Container = string | HTMLElement | null;

export function wanim<T extends WanimScene>(
    SceneConstructor: new () => T,
    container?: Container
) {
    console.log("wanim called on", SceneConstructor, container);

    if (typeof container === "string") {
        container = document.querySelector(container) as HTMLElement;
    }
    if (!container) {
        container = document.createElement("div");
        container.style.cssText =
            "position: fixed; left: 0; top: 0; width: 100dvw; height: 100dvh; pointer-events: none";

        document.body.appendChild(container);
    }

    const svgContainer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    ) as SVGElement;
    svgContainer.style.cssText = "width: 100%; height: 100%";
    svgContainer.setAttribute("viewBox", "-100 -100 200 200");

    container.appendChild(svgContainer);

    const sceneInstance = new SceneConstructor();
    sceneInstance.construct();

    for (const vwObject of sceneInstance.objects) {
        svgContainer.appendChild(vwObject.element);
        vwObject.element.style.pointerEvents = "all";
    }

    const playbackControls = sceneInstance.animate();

    return {
        destroy() {
            playbackControls.cancel();
            svgContainer.remove();
        },
    };
}
