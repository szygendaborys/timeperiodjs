// import sinon from "sinon";
import "mocha";
import { expect } from 'chai';
import Period from "../dev/period/Period";
import Duration from "../dev/duration/Duration";

describe("Period unit tests", () => {

    const now = new Date();
    const hourAfter = new Date(now); hourAfter.setHours(hourAfter.getHours() + 1);

    it("should create a period instance", () => {
        const period = new Period(new Date(), new Date());
        expect(period).to.be.instanceOf(Period);
    });

    it('', () => {
        const period = new Period(new Date('asd'), new Date());
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(period.start.getTime()).to.be.NaN;
    })

    describe("Internal duration tests", () => {

        it("the duration should be 0", () => {
            const period = new Period(new Date(), new Date());
            expect(period.duration).to.be.instanceOf(Duration);
            expect(period.duration.inMilliseconds).to.equal(0);
        });

        it("the period should be larger than 0 and should be equal to 3600000", () => {
            const period = new Period(now, hourAfter);
            expect(period.duration.inMilliseconds).to.be.equal(1000 * 3600);
        })

    })

    describe("Period fitering methods", () => {

        it("should return two dates", () => {
            const period = new Period(new Date(2020, 1, 1), new Date(2020, 11, 31));
            const datesToFilter = [
                new Date(2021, 1, 1),
                new Date('asd'),
                new Date(2020, 2, 2),
                new Date(2023, 4, 1),
                new Date(2020, 1, 1)
            ];

            expect(period.getOverlappingDates(...datesToFilter)).to.be.length(2);
        })
    })
});
