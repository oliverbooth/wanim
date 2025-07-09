import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoCode, IoMenu, IoReload } from "react-icons/io5";
import { WanimScene, wanim } from "wanim";

import { useInView } from "@/lib/use-in-view";

export interface WanimSceneExampleProps {
    scene: new () => WanimScene;
    id?: string;
    code?: string;
    title?: string;
    tags?: string[];
}

export function WanimSceneExample({ scene, id, code, title, tags }: WanimSceneExampleProps) {
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
        "bg-neutral-800 text-neutral-500 py-1 px-2",
        "hover:bg-neutral-700 hover:text-neutral-400 hover:ring-neutral-500",
        "transition-all cursor-pointer rounded-sm flex flex-row items-center gap-1",
    );

    return (
        <div className={clsx("not-content mt-4! border-l-4 border-l-[#5eb8f2] rounded-md overflow-hidden")} id={id}>
            {title && (
                <div className="bg-[#3b7398] flex flex-row items-center py-1">
                    <span className="px-2">
                        <IoMenu />
                    </span>
                    <span className="font-bold text-white">{title}</span>
                    {id && (
                        <span className="px-1">
                            <a href={"#" + id}>#</a>
                        </span>
                    )}
                </div>
            )}
            <div className={clsx("group relative h-80 bg-black")} ref={container}>
                <div
                    className={clsx(
                        "absolute flex flex-row gap-2 top-3 right-3 items-center",
                        "md:group-hover:opacity-100 md:opacity-25 transition-all duration-200",
                    )}
                >
                    {!!code && (
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
            {code && showCode && (
                <div className="! text-sm font-[weight:--ec-uiFontWg] leading-[--ec-uiLineHt]">
                    <Highlight language="ts" code={code} theme={{ plain: {}, styles: [] }}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className={clsx(
                                    className,
                                    "my-0! font-(family-name:--__sl-font-mono)! text-sm! leading-6",
                                )}
                                style={style}
                            >
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
            {tags && tags.length > 0 && (
                <div className="bg-neutral-800 text-neutral-400 py-2 px-2 text-xs flex flex-row items-center gap-1">
                    <span className="pr-1 font-bold">Tags:</span>
                    <span>{tags.join(", ")}</span>
                </div>
            )}
        </div>
    );
}
