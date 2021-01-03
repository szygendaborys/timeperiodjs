import { Filter } from "../interfaces/IFilter";

export default class DateFilter extends Filter {

    constructor(dates: Date[]) {
        super(undefined, dates);
    }

    public filterDuplicates(): Date[] {
        const timestampSet: Set<number> = new Set();

        for (let i = 0; i < this._dates.length; i++) {
            timestampSet.add(this._dates[i].getTime());
        }

        this._dates = Array.from(timestampSet).map(timestamp => new Date(timestamp));

        return this.dates;
    }
}