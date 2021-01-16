import IPeriodFilterConf from "../interfaces/confs/IPeriodFilterConf.interface";
import { Filter } from "../interfaces/IFilter";
import Period from "../Period";
import PeriodDateSorter from "../sorters/PeriodDateSorter";

export default class PeriodFilter extends Filter {

    private _onlyFullyCovered: boolean;

    private _cutPeriodsBeyondTheBoundary: boolean;

    constructor(private _basePeriod: Period) {
        super();

        // config
        this._onlyFullyCovered = false;
        this._cutPeriodsBeyondTheBoundary = false;
    }

    public filterPeriods(periods: Period[], conf?: IPeriodFilterConf): Period[] {
        let periodsToFilter = new PeriodDateSorter(periods).sort();

        if (conf) {
            this._cutPeriodsBeyondTheBoundary = !!conf.cutPeriodsBeyondTheBoundary;
            this._onlyFullyCovered = !!conf.onlyFullyCovered;
        }

        if (this._onlyFullyCovered) {
            periodsToFilter = periodsToFilter.filter(period => period.start >= this._basePeriod.start && period.end <= this._basePeriod.end);
        } else {
            periodsToFilter = periodsToFilter.filter(period => period.end >= this._basePeriod.start && period.start <= this._basePeriod.end);
        }

        if (this._cutPeriodsBeyondTheBoundary) {
            for (let i = 0; i < periodsToFilter.length; i++) {
                const currentPeriod = periodsToFilter[i];

                if (currentPeriod.start < this._basePeriod.start)
                    currentPeriod.setStart = this._basePeriod.start;

                if (currentPeriod.end > this._basePeriod.end)
                    currentPeriod.setEnd = this._basePeriod.end;

            }
        }

        return periodsToFilter;
    }

}