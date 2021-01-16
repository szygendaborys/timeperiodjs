import Duration from "../duration/Duration";
import PeriodFilter from "./filters/PeriodFilter";
import IPeriod, { PeriodDTO } from "./interfaces/IPeriod";
import PeriodTimeChanger from "./PeriodTimeChanger";

export default class Period extends IPeriod implements PeriodDTO {

  public get start(): Date {
    return new Date(this._start);
  }

  public get end(): Date {
    return new Date(this._end);
  }

  public get duration(): Duration {
    return new Duration(this._end.getTime() - this._start.getTime());
  }

  public get change(): PeriodTimeChanger {
    return this._timeChanger;
  }

  public get filter(): PeriodFilter {
    return new PeriodFilter(this)
  }

  public get isValid(): boolean {
    /* eslint-disable no-restricted-globals */
    return !(isNaN(this._start.getTime()) || isNaN(this._end.getTime()));
  }

  public set setStart(date: Date) {
    this._start = new Date(date);
  }

  public set setEnd(date: Date) {
    this._end = new Date(date);
  }

}
