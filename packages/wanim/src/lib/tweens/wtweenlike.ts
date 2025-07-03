export class WTweenLike implements PromiseLike<void> {
    get isRunning() {
        return this._running;
    }

    protected _running: boolean = false;

    protected _promise: Promise<void>;
    protected _resolve!: () => void;
    protected _reject!: (reason?: any) => void;

    protected _onPlay?: () => void;
    protected _onUpdate?: (progress: number) => void;
    protected _onComplete?: () => void;

    constructor() {
        this._promise = new Promise<void>((res, rej) => {
            this._resolve = res;
            this._reject = rej;
        });
    }

    onPlay(callback: () => void): this {
        this._onPlay = callback;
        return this;
    }
    onUpdate(callback: (progress: number) => void): this {
        this._onUpdate = callback;
        return this;
    }
    onComplete(callback: () => void): this {
        this._onComplete = callback;
        return this;
    }

    then<TResult1 = void, TResult2 = never>(
        onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined,
    ): PromiseLike<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    play() {
        this._running = true;
        this._onPlay?.();
        this.update(0); // might be a bit hacky
    }
    update(delta: number) {}
    pause() {
        this._running = false;
    }

    cancel() {
        this._running = false;
        this._reject();
    }
    complete() {
        this._running = false;
        this._onComplete?.();
        this._resolve();
    }
}
