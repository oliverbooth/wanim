type EasingFunction = (t: number) => number;

interface TweenOptions {
    duration: number;
    easing?: EasingFunction;
    onPlay?: () => void;
    onUpdate?: (progress: number) => void;
    onComplete?: () => void;
}

export class WTween implements PromiseLike<void> {
    private running: boolean = false;

    private progress: number = 0;

    private promise: Promise<void>;
    private resolve!: () => void;
    private reject!: (reason?: any) => void;

    constructor(private options: TweenOptions) {
        this.promise = new Promise<void>((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }

    then<TResult1 = void, TResult2 = never>(
        onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined
    ): PromiseLike<TResult1 | TResult2> {
        return this.promise.then(onfulfilled, onrejected);
    }

    play() {
        this.running = true;
        this.options.onPlay?.();
        this.update(0); // might be a bit hacky
    }

    update(delta: number) {
        if (!this.running) return;

        this.progress += delta / this.options.duration;
        this.progress = Math.min(this.progress, 1);

        const eased = this.options.easing ? this.options.easing(this.progress) : this.progress;
        this.options.onUpdate?.(eased);

        if (this.progress >= 1) {
            this.complete();
        }
    }

    pause() {
        this.running = false;
    }

    cancel() {
        this.running = false;
        this.reject();
    }

    complete() {
        this.running = false;
        this.options.onComplete?.();
        this.resolve();
    }

    isRunning() {
        return this.running;
    }
}
