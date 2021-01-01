export default abstract class IPeriod {
    protected readonly _start: Date;

    protected readonly _end: Date;

    constructor(start: Date, end: Date) {
        this._start = new Date(start);
        this._end = new Date(end);
    }

    public getOverlappingDates(...dates: Date[]): Date[] {
        return dates.filter(date => date >= this._start && date <= this._end);
    }

}