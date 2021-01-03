// import sinon from "sinon";
import "mocha";
import { expect } from 'chai';
import PeriodTimeChanger from "../dev/period/PeriodTimeChanger";
import { TimeType } from "../dev/Constants";
import Period from "../dev/period/Period";

describe("Time management unit tests", () => {

    it('Should assign correct multipliers for ms', () => {
        const result = PeriodTimeChanger.getMsMultiplier();
        expect(result).to.equal(1);
    });

    it('Should assign correct multipliers for minutes', () => {
        const result = PeriodTimeChanger.getMsMultiplier(TimeType.MINUTES);
        expect(result).to.equal(1000 * 60);
    });

    it('Should assign correct multipliers for days', () => {
        const result = PeriodTimeChanger.getMsMultiplier(TimeType.DAYS);
        expect(result).to.equal(1000 * 60 * 60 * 24);
    });

    it('Should assign correct multipliers for start date type change in seconds', () => {
        const result = PeriodTimeChanger.getMsMultiplier(TimeType.SECONDS, true);
        expect(result).to.equal(-1000);
    });

    describe('Period time changer tests', () => {

        let period = new Period(new Date(2020, 1, 1), new Date(2020, 2, 1));

        beforeEach(() => {
            period = new Period(new Date(2020, 1, 1), new Date(2020, 2, 1));
        });

        it('should extend the period end by 1 day', () => {
            period.change.extendPeriod(1, TimeType.DAYS);

            expect(period.end.getTime()).to.equal(new Date(2020, 2, 2).getTime());
        });

        it('should extend the period start by 1 hour', () => {
            const value = new Date(2020, 1, 1); value.setHours(value.getHours() - 1);

            period.change.extendPeriod(1, TimeType.HOURS, true);

            expect(period.start.getTime()).to.equal(value.getTime());
        });

        it('should shorten the period end by 2 minutes', () => {
            const value = new Date(2020, 2, 1); value.setMinutes(value.getMinutes() - 2);

            period.change.shortenPeriod(2, TimeType.MINUTES);

            expect(period.end.getTime()).to.equal(value.getTime());
        });

        it('should shorten the period start by 2000 ms', () => {
            const value = new Date(2020, 1, 1); value.setMilliseconds(value.getMilliseconds() + 2000);

            period.change.shortenPeriod(2000, TimeType.MILLISECONDS, true);

            expect(period.start.getTime()).to.equal(value.getTime());
        });

    })

});
