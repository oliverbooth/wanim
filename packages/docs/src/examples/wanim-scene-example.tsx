import { useEffect, useRef, useState } from "react";
import { IoReload } from "react-icons/io5";
import { wanim, WanimScene } from "wanim";
import clsx from "clsx";

export function WanimSceneExample({ scene }: { scene: new () => WanimScene }) {
    const container = useRef<HTMLDivElement>(null!);
    const [renderIndex, setRenderIndex] = useState(0);

    useEffect(() => {
        const w = wanim(scene, container.current);
        return () => {
            w.destroy();
        };
    }, [renderIndex]);

    return (
        <div className="group relative mt-4! h-80 bg-black ring ring-neutral-800 rounded-md" ref={container}>
            <div
                className={clsx(
                    "absolute flex flex-row gap-2 top-3 right-3",
                    "md:group-hover:opacity-100 md:opacity-0 transition-all duration-200"
                )}
            >
                <button
                    className={clsx(
                        "bg-neutral-800 text-neutral-500 ring ring-neutral-600",
                        "hover:bg-neutral-700 hover:text-neutral-400 hover:ring-neutral-500",
                        "transition-all cursor-pointer p-[5px] rounded-sm"
                    )}
                    onClick={() => setRenderIndex((i) => i + 1)}
                    tabIndex={-1}
                >
                    <IoReload className="text-xl" />
                </button>
            </div>
        </div>
    );
}
