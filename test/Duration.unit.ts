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
    })

});
