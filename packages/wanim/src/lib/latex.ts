let mathJaxReady: Promise<void> | null = null;

function loadMathJax(): Promise<void> {
    if (mathJaxReady) return mathJaxReady;

    mathJaxReady = new Promise((resolve, reject) => {
        if ((window as any).MathJax) return resolve();

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
        script.async = true;

        // Optional: configure before loading
        (window as any).MathJax = {
            loader: { load: ["input/tex", "output/svg"] },
            tex: { packages: ["base", "ams"] },
            svg: { fontCache: "none" },
            startup: {
                ready: () => {
                    (window as any).MathJax.startup.defaultReady();
                    resolve();
                },
            },
        };

        script.onerror = reject;
        document.head.appendChild(script);
    });

    return mathJaxReady;
}

export async function tex2svg(latex: string, display = true): Promise<SVGElement> {
    await loadMathJax();
    const container = (window as any).MathJax.tex2svg(latex, { display }) as HTMLElement;
    const svgNode = container.firstElementChild as SVGElement;
    svgNode.style.fontSize = "1";
    return svgNode;
}
