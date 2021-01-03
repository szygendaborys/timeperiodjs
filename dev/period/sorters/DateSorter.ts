import { ISorter, Sorter } from "../interfaces/ISorter";
import { SortingMethods } from "../PeriodConstants";

export default class DateSorter extends Sorter implements ISorter {
    constructor(dates: Date[]) {
        super(undefined, dates);
    }

    public sort(descending?: boolean): Date[] {
        const sortingMethod: SortingMethods = descending ? SortingMethods.SORT_DESCENDING : SortingMethods.SORT_ASCENDING;
        this._dates = this._dates.sort((a, b) => Sorter[sortingMethod](a.getTime(), b.getTime()));
        return this.dates;
    }
}