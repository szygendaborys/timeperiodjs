// import sinon from "sinon";
import "mocha";
import { expect } from 'chai';
import Period from "../dev/period/Period";
import PeriodFilter from "../dev/period/filters/PeriodFilter";
import IPeriodFilterConf from "../dev/period/interfaces/confs/IPeriodFilterConf.interface";

describe("Period filter unit tests", () => {

    let basePeriod = new Period(new Date(2020, 1, 1), new Date(2020, 5, 30));
    let periods = require('./mock/periods.mock').default;

    beforeEach(() => {
        basePeriod = new Period(new Date(2020, 1, 1), new Date(2020, 5, 30));
        periods = require('./mock/periods.mock').default;
    })

    it('Should filter out all periods', () => {
        basePeriod = new Period(new Date(2021, 1, 1), new Date(2021, 5, 30));

        const result = new PeriodFilter(basePeriod).filterPeriods(periods);

        expect(result).to.be.length(0);
    });

    it('Should return 2 sorted periods', () => {
        const periodsToFilter = [
            periods[2], periods[0], periods[5], periods[1]
        ];

        const result = new PeriodFilter(basePeriod).filterPeriods(periodsToFilter);

        expect(result).to.be.length(3);
        expect(result[0].start.getTime()).to.be.equal(periods[0].start.getTime())
    });


    it('Should return 2 periods (only full overlap)', () => {
        const periodsToFilter = [
            periods[2], periods[0], periods[5], periods[1]
        ];
        const conf: IPeriodFilterConf = {
            onlyFullyCovered: true
        }

        const result = new PeriodFilter(basePeriod).filterPeriods(periodsToFilter, conf);

        expect(result).to.be.length(2);
        expect(result[0].start.getTime()).to.be.equal(periods[0].start.getTime());
    });

    it('Should return 2 periods (with changed end date)', () => {
        basePeriod.setStart = new Date(2020, 1, 2);

        const periodsToFilter = [
            periods[1], periods[5], periods[1]
        ];

        const conf: IPeriodFilterConf = {
            cutPeriodsBeyondTheBoundary: true
        }

        const result = new PeriodFilter(basePeriod).filterPeriods(periodsToFilter, conf);

        expect(result).to.be.length(2);
        expect(result[0].end.getTime()).to.be.equal(basePeriod.end.getTime());
        expect(result[0].start.getTime()).to.be.equal(basePeriod.start.getTime());
    });

});
