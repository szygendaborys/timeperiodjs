import IPeriodFilterConf from "../interfaces/confs/IPeriodFilterConf.interface";
import { Filter } from "../interfaces/IFilter";
import Period from "../Period";

export default class PeriodFilter extends Filter {

    public static filterPeriods(periods: Period[], conf?: IPeriodFilterConf): Period[] {
        if (conf) {
            console.log("stop");
        }
        return periods;
    }

}