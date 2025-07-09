import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoCode, IoReload } from "react-icons/io5";
import { WanimScene, wanim } from "wanim";

import { useInView } from "@/lib/use-in-view";

export function WanimSceneExample({ scene, source }: { scene: new () => WanimScene; source?: string }) {
    const [showCode, setShowCode] = useState(false);
    const container = useRef<HTMLDivElement>(null!);
    const [w, setW] = useState<ReturnType<typeof wanim>>();
    const inView = useInView(container, {});

    const render = useCallback(() => {
        if (w) w.destroy();

        setW(wanim(scene, container.current));
    }, [w]);

    useEffect(() => {
        if (w) return;
        if (inView) render();
    }, [inView]);

    const toolbarButtonStyles = clsx(
        "bg-neutral-800 text-neutral-500 ring ring-neutral-600 py-1 px-2",
        "hover:bg-neutral-700 hover:text-neutral-400 hover:ring-neutral-500",
        "transition-all cursor-pointer rounded-sm flex flex-row items-center gap-1",
    );

    return (
        <div className="not-content">
            <div
                className={clsx(
                    "group relative mt-4! h-80 bg-black ring ring-neutral-800 rounded-md shadow-md overflow-hidden",
                )}
                ref={container}
            >
                <div
                    className={clsx(
                        "absolute flex flex-row gap-2 top-3 right-3 items-center",
                        "md:group-hover:opacity-100 md:opacity-25 transition-all duration-200",
                    )}
                >
                    {!!source && (
                        <button
                            className={clsx(toolbarButtonStyles)}
                            onClick={() => setShowCode((s) => !s)}
                            tabIndex={-1}
                        >
                            <IoCode className="text-xl" />
                            <span className="text-sm">{showCode ? "Hide" : "Show"} Code</span>
                        </button>
                    )}
                    <button className={clsx(toolbarButtonStyles)} onClick={() => render()} tabIndex={-1}>
                        <IoReload className="text-xl" />
                    </button>
                </div>
            </div>
            {source && showCode && (
                <div className="!-mt-4 px-1 pt-3 bg-(--ec-frm-edBg)">
                    <Highlight language="ts" code={source} theme={{ plain: {}, styles: [] }}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={clsx(className, "!text-xs leading-6")} style={style}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>
            )}
        </div>
    );
}
