// import sinon from "sinon";
import "mocha";
import { expect } from 'chai';
import Duration from "../dev/duration/Duration";

describe("Duration unit tests", () => {

    it('Should return a Duration', () => {
        const duration = new Duration(123);
        expect(duration).to.be.instanceOf(Duration);
    });

    it('Should return appropriate duration times', () => {
        const durationTime = 60 * 60 * 1000; // 1 hour
        const duration = new Duration(durationTime);

        expect(duration.inMilliseconds).to.equal(durationTime);
        expect(duration.inSeconds).to.equal(3600);
        expect(duration.inMinutes).to.equal(60);
        expect(duration.inHours).to.equal(1);
    });

    it('Should return an appropriate duration of time', () => {
        const durationTime = 1000 * 3600 * 24; // 1 day
        const time1 = new Date(2020, 1, 1);
        const time2 = new Date(2020, 1, 2);

        const result = Duration.getDurationBetween(time1, time2);

        expect(result).to.be.instanceOf(Duration);
        expect(result.inMilliseconds).to.be.equal(durationTime);
        expect(result.inHours).to.be.equal(24);

    });

    it('Should not return an appropriate duration of time', () => {
        const time1 = new Date(2020, 1, 1);
        const time2 = new Date('asd');

        const result = Duration.getDurationBetween(time1, time2);

        expect(result).to.be.instanceOf(Duration);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(result.inMilliseconds).to.be.NaN;
    });

});
