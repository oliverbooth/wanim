import { WanimScene } from "./wanimscene.js";

type Container = string | HTMLElement | null;

/**
 * Starts running the specified {@link WanimScene} in the specified container.
 *
 * @param SceneConstructor
 * @param container An ID or an HTMLElement. If a nullish value is passed, this creates a fixed fullscreen container.
 * @returns An instance of controls to manage the animation.
 */
export function wanim<T extends WanimScene>(SceneConstructor: new () => T, container?: Container) {
    let generateContainer = false;

    if (typeof container === "string") {
        container = document.querySelector(container) as HTMLElement;
    }
    if (!container) {
        generateContainer = true;

        container = document.createElement("div");
        container.style.cssText =
            "position: fixed; left: 0; top: 0; width: 100dvw; height: 100dvh; pointer-events: none";

        document.body.appendChild(container);
    }

    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGElement;
    svgContainer.style.cssText = "width: 100%; height: 100%";
    svgContainer.setAttribute("viewBox", "-100 -100 200 200");

    container.appendChild(svgContainer);

    const sceneInstance = new SceneConstructor();
    sceneInstance.container = svgContainer;

    // this runs as a forgettable promise for now
    sceneInstance.run();

    return {
        destroy() {
            (generateContainer ? container : svgContainer).remove();
        },
    };
}
