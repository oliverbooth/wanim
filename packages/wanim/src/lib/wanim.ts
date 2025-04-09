import { WanimScene } from "./wanimscene.js";

type ContainerInit = string | HTMLElement | null;

/**
 * Starts running the specified {@link WanimScene} in the specified container.
 *
 * @param SceneConstructor
 * @param containerInit An ID or an HTMLElement. If a nullish value is passed, this creates a fixed fullscreen container.
 * @returns An instance of controls to manage the animation.
 */
export function wanim<T extends WanimScene>(SceneConstructor: new () => T, containerInit?: ContainerInit) {
    const { container, wasGenerated } = ensureContainer(containerInit);
    const svgContainer = createSvgContainer(container);

    const sceneInstance = new SceneConstructor();
    sceneInstance.container = svgContainer;

    let previousTimestamp: number;
    let frameHandle: number;
    function update(timestamp: number) {
        const delta = (timestamp - (previousTimestamp ?? timestamp)) / 1000;

        sceneInstance.update(delta);

        previousTimestamp = timestamp;
        frameHandle = requestAnimationFrame(update);
    }
    frameHandle = requestAnimationFrame(update);

    // run scene script
    Promise.resolve(sceneInstance.run()).then(() => {
        // done
        cancelAnimationFrame(frameHandle);
    });

    return {
        destroy() {
            cancelAnimationFrame(frameHandle);
            (wasGenerated ? container : svgContainer).remove();
        },
    };
}

function ensureContainer(containerInit?: ContainerInit): { container: HTMLElement; wasGenerated: boolean } {
    let wasGenerated = false;
    let container: HTMLElement;

    if (!containerInit) {
        wasGenerated = true;

        container = document.createElement("div");
        container.style.cssText =
            "position: fixed; left: 0; top: 0; width: 100dvw; height: 100dvh; pointer-events: none";

        document.body.appendChild(container);
    } else if (typeof containerInit === "string") {
        container = document.querySelector(containerInit) as HTMLElement;
    } else {
        // containerInit is HTMLElement
        container = containerInit;
    }

    return {
        container,
        wasGenerated,
    };
}

function createSvgContainer(container: HTMLElement): SVGElement {
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGElement;
    svgContainer.style.cssText = "width: 100%; height: 100%";
    svgContainer.setAttribute("viewBox", "-5 -5 10 10");

    container.appendChild(svgContainer);

    return svgContainer;
}
