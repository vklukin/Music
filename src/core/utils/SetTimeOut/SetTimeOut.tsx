export class SetTimeOut {
    public _timeout: NodeJS.Timeout | undefined;

    constructor() {
        this._timeout = undefined;
    }

    start(func: () => void, ms: number) {
        this._timeout = setTimeout(func, ms);
    }

    stop() {
        clearTimeout(this._timeout);
    }
}
