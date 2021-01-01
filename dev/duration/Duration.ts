export default class Duration {

    private _duration: number;

    constructor(durationInMilliseconds: number) {
        this._duration = durationInMilliseconds;
    }

    public get inMilliseconds(): number {
        return this._duration;
    }

    public get inSeconds(): number {
        return this._duration / 1000;
    }

    public get inMinutes(): number {
        return this.inSeconds / 60;
    }

    public get inHours(): number {
        return this.inMinutes / 60;
    }
}