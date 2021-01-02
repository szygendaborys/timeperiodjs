import { ISorter, Sorter } from "../interfaces/ISorter";
import Period from "../Period";
import { PeriodDateTypes, SortingMethods } from "../PeriodConstants.";

export default class PeriodDateSorter extends Sorter implements ISorter {

    public sort(descending?: boolean, byEndDate?: boolean): Period[] {
        const sortingDate: PeriodDateTypes = byEndDate ? PeriodDateTypes.END : PeriodDateTypes.START;
        const sortingMethod: SortingMethods = descending ? SortingMethods.SORT_DESCENDING : SortingMethods.SORT_ASCENDING;

        this._periods = this._periods
            .sort((a, b) => Sorter[sortingMethod](a[sortingDate].getTime(), b[sortingDate].getTime()));

        return this._periods;
    }
}