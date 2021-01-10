/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import Duration from "../../duration/Duration";
import DateFilter from "../filters/DateFilter";
import Period from "../Period";
import { PeriodComparisonStatuses } from "../PeriodConstants";
import PeriodTimeChanger from "../PeriodTimeChanger";
import DateSorter from "../sorters/DateSorter";
import { IPeriodOverlappingConf } from "./confs/IPeriodOverlappingConf.interface";
import IPeriodComparison from "./IPeriodComparison";

export interface PeriodDTO {
    start: Date;
    end: Date;
    duration: Duration;
    change: PeriodTimeChanger;
}

export default abstract class IPeriod {
    protected _start: Date;

    protected _end: Date;

    protected readonly _timeChanger: PeriodTimeChanger;

    constructor(start: Date, end: Date) {
        this._start = new Date(start);
        this._end = new Date(end);
        this._timeChanger = new PeriodTimeChanger(this._start, this._end);
    }

    public getDates(): Date[] {
        return [new Date(this._start), new Date(this._end)];
    }

    public getOverlappingDates(dates: Date[]): Date[] {
        return dates.filter(date => date >= this._start && date <= this._end);
    }

    public isDateOverlapping(date: Date): boolean {
        return this.getOverlappingDates([date]).length > 0;
    }

    public isPeriodOverlapping(period: Period, conf?: IPeriodOverlappingConf): boolean {
        return this.getOverlappingPeriods([period], conf).length > 0;
    }

    // eslint-disable-next-line class-methods-use-this
    public getOverlappingPeriods(periods: Period[], conf?: IPeriodOverlappingConf): Period[] {
        if (conf?.onlyFullOverlaps) {
            return periods.filter(period => period.start >= this._start && period.end <= this._end);
        }

        return periods.filter(period => period.end >= this._start && period.start <= this._end);
    }

    public comparePeriod(period: Period): IPeriodComparison[] {
        const periodComparisonsDTO: IPeriodComparison[] = [];
        const allDates = new DateSorter([...this.getDates(), ...period.getDates()]).sort();
        const dates = new DateFilter(allDates).filterDuplicates();

        const conf: IPeriodOverlappingConf = {
            onlyFullOverlaps: true,
        }

        let lastEntry: Date | undefined;

        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            if (lastEntry) {
                const tempPeriod = new Period(lastEntry, date);
                const periodComparisonDTO: IPeriodComparison = {
                    status: PeriodComparisonStatuses.EXACT,
                    start: tempPeriod.start,
                    end: tempPeriod.end
                };

                if (this.isPeriodOverlapping(tempPeriod, conf) && !period.isPeriodOverlapping(tempPeriod, conf)) periodComparisonDTO.status = PeriodComparisonStatuses.REMOVED;
                else if (!this.isPeriodOverlapping(tempPeriod, conf) && period.isPeriodOverlapping(tempPeriod, conf)) periodComparisonDTO.status = PeriodComparisonStatuses.ADDED;

                periodComparisonsDTO.push(periodComparisonDTO);
            }
            lastEntry = new Date(date);
        }

        return periodComparisonsDTO;
    }

    public cutBoundaries(periods: Period[]): Period[] {
        return this.getOverlappingPeriods(periods).map(period => {
            if (period._start < this._start) period.setStart = this._start;
            if (period._end > this._end) period.setEnd = this._end;
            return period;
        });
    }

}