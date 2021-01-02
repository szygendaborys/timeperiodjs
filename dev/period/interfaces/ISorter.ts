import Period from "../Period";

export interface ISorter {
    sort(): Period[]
}

export abstract class Sorter {
    protected _periods: Period[];

    constructor(periods: Period[]) {
        this._periods = [...periods];
    }

    public get periods(): Period[] {
        return this._periods;
    }

    protected static sortAscending(firstVal: number, secondVal: number): number {
        return firstVal - secondVal;
    }

    protected static sortDescending(firstVal: number, secondVal: number): number {
        return secondVal - firstVal;
    }
}