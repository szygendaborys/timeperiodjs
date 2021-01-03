import { TimeType } from "../Constants";

export default class PeriodTimeChanger {

    private _start: Date;

    private _end: Date;

    constructor(start: Date, end: Date) {
        // NOTE: Dates have to be bonded to its source. Do not lose this bonding by using 'new Date()'
        this._start = start;
        this._end = end;
    }

    public extendPeriod(value: number, type: TimeType = TimeType.MILLISECONDS, changeStartTime?: boolean): void {
        const timeType = changeStartTime ? '_start' : '_end';
        const multiplier = PeriodTimeChanger.getMsMultiplier(type, changeStartTime);

        const ms = value * multiplier;
        this[timeType].setMilliseconds(this[timeType].getMilliseconds() + ms);
    }

    public shortenPeriod(value: number, type: TimeType = TimeType.MILLISECONDS, changeStartTime?: boolean): void {
        const timeType = changeStartTime ? '_start' : '_end';
        const multiplier = PeriodTimeChanger.getMsMultiplier(type, changeStartTime);

        const ms = value * multiplier;
        this[timeType].setMilliseconds(this[timeType].getMilliseconds() - ms);
    }

    public static getMsMultiplier(type: TimeType = TimeType.MILLISECONDS, changeStartTime?: boolean): number {
        let multiplier = 1;
        let foundType = false;

        // seconds
        if (!foundType && type !== TimeType.MILLISECONDS) multiplier *= 1000;
        else foundType = true;

        // minutes
        if (!foundType && type !== TimeType.SECONDS) multiplier *= 60;
        else foundType = true;

        // hours
        if (!foundType && type !== TimeType.MINUTES) multiplier *= 60;
        else foundType = true;

        // days
        if (!foundType && type !== TimeType.HOURS) multiplier *= 24;// then it has to be days
        else foundType = true;

        if (changeStartTime) multiplier *= -1;
        return multiplier;
    }

}