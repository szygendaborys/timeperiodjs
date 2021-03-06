import Period from "../Period";

export interface ISorter {
    sort(): Period[] | Date[]
}

export abstract class Sorter {
    protected _periods: Period[] = [];

    protected _dates: Date[] = [];

    constructor(periods?: Period[], dates?: Date[]) {
        if (periods) this._periods = [...periods];
        if (dates) this._dates = [...dates];
    }

    public get periods(): Period[] {
        return [...this._periods];
    }

    public get dates(): Date[] {
        return [...this._dates];
    }

    protected static sortAscending(firstVal: number, secondVal: number): number {
        return firstVal - secondVal;
    }

    protected static sortDescending(firstVal: number, secondVal: number): number {
        return secondVal - firstVal;
    }
}