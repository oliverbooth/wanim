import type React from "react";
import { useEffect, useState } from "react";

export const useInView = (target: React.RefObject<HTMLElement>, options: IntersectionObserverInit = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [observer, setObserver] = useState<IntersectionObserver | null>(null);

    useEffect(() => {
        const callback: IntersectionObserverCallback = (entries) => {
            setIsIntersecting(entries[0].isIntersecting);
        };

        observer?.disconnect();

        if (target.current) {
            const _observer = new IntersectionObserver(callback, options);
            _observer.observe(target.current);
            setObserver(_observer);
        }

        return () => {
            observer?.disconnect();
        };
    }, [target.current, JSON.stringify(options)]);

    return isIntersecting;
};
