export class SetTimeOut {
    public _timeout: NodeJS.Timeout | undefined | null;

    constructor() {
        this._timeout = undefined;
    }

    start(func: () => void, ms: number) {
        this._timeout = setTimeout(() => {
            func();
            this._timeout = null;
        }, ms);
    }

    stop() {
        !!this._timeout && clearTimeout(this._timeout);
        this._timeout = null;
    }
}
