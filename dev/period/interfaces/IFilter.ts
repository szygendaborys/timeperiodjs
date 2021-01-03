import Period from "../Period";

export interface IFilter {
    filter(): Period[] | Date[]
}

export abstract class Filter {
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
}