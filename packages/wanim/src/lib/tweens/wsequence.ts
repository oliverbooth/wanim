import { WTweenLike } from "./wtweenlike.js";

type TimelineItem = WTweenLike | WTweenLike[] | (() => void) | (() => Promise<void>) | number;
type Timeline = TimelineItem[];

export class WSequence extends WTweenLike {
    timeline: Timeline = [];

    protected _timelineIndex: number = 0;
    protected _delayTimer: number = 0;

    protected _promisePending: boolean = false;
    protected _promiseResolved: boolean = false;

    override play(): void {
        this._timelineIndex = -1;
        this.queueNextItem();

        super.play();
    }

    override update(delta: number): void {
        if (!this._running) return;
        if (this._timelineIndex >= this.timeline.length) return;

        const currentItem = this.timeline[this._timelineIndex];
        if (currentItem instanceof WTweenLike) {
            currentItem.update(delta);
            if (!currentItem.isRunning) {
                this.queueNextItem();
            }
        } else if (Array.isArray(currentItem)) {
            let allComplete = true;
            for (const item of currentItem) {
                if (item instanceof WTweenLike) {
                    item.update(delta);
                    if (item.isRunning) {
                        allComplete = false;
                    }
                }
            }
            if (allComplete) {
                this.queueNextItem();
            }
        } else if (typeof currentItem === "function") {
            if (!this._promisePending) {
                const result = currentItem();
                if (result instanceof Promise) {
                    this._promisePending = true;
                    this._promiseResolved = false;

                    result.then(() => {
                        this._promiseResolved = true;
                    });
                }
            } else {
                if (this._promiseResolved) {
                    this._promisePending = false;
                    this._promiseResolved = false;

                    this.queueNextItem();
                }
            }
        } else if (typeof currentItem === "number") {
            this._delayTimer += delta;

            if (this._delayTimer >= currentItem) {
                this._delayTimer = 0;
                this.queueNextItem();
            }
        }
    }

    private queueNextItem(): void {
        this._timelineIndex++;

        if (this._timelineIndex >= this.timeline.length) {
            this.complete();
            return;
        }

        const nextItem = this.timeline[this._timelineIndex];
        if (nextItem instanceof WTweenLike) {
            nextItem.play();
        } else if (Array.isArray(nextItem)) {
            for (const item of nextItem) {
                if (item instanceof WTweenLike) {
                    item.play();
                }
            }
        }
    }

    append(item: TimelineItem): this {
        this.timeline.push(item);
        return this;
    }

    join(item: WTweenLike): this {
        const lastItem = this.timeline[this.timeline.length - 1];
        if (lastItem instanceof WTweenLike) {
            this.timeline.splice(this.timeline.length - 1, 1, [lastItem, item]);
        } else if (Array.isArray(lastItem)) {
            lastItem.push(item);
        } else {
            throw new Error("Cannot join to a non-tween item in the sequence.");
        }

        return this;
    }

    wait(secondsOrCallback: number | (() => Promise<unknown>)): this {
        this.timeline.push(secondsOrCallback);
        return this;
    }

    callback(fun: () => void): this {
        this.timeline.push(fun);
        return this;
    }
}

export function sequence(): WSequence {
    return new WSequence();
}
