import * as assert from 'assert';
import * as mocha from 'mocha';

import { Layout } from './Layout';
import { isNullOrUndefined, isNull } from 'util';
import { Vec3d } from './Vec3d';
import { MathUtil } from './MathUtil';


describe("Layout", function() {
    let testLayout = new Layout();

    it("has magnetometer positions", function() {
        assert.ok(!isNullOrUndefined(testLayout.magnetometers));
        assert.ok(testLayout.magnetometers.length > 0);
    });

    it("has positive ring radius", function() {
        assert.ok(!isNullOrUndefined(testLayout.ringRadius));
        assert.ok(testLayout.ringRadius > 0);
    });

    it("has magnet positions", function() {
        assert.ok(!isNullOrUndefined(testLayout.magnets));
        assert.ok(testLayout.magnets.length > 0);
    });

    describe("function:clone", function() {
        let testLayout: Layout = new Layout();
        it("Makes a copy of the original layout", function() {
            let clonedLayout = testLayout.clone();
            assert.notEqual(clonedLayout, testLayout);
            assert.deepEqual(clonedLayout, testLayout);
            // FIXME: confirm that these guys aren't sharing objects
            // assert.notDeepStrictEqual(clonedLayout, testLayout);
        });
    });

    describe("function:neighbor", function() {
        let testLayout: Layout = new Layout();

        let neighbor: Layout = testLayout.neighbor();

        it("gets a neighbor, which is not the same as the original layout", function() {
            assert.ok(!isNullOrUndefined(neighbor));
            assert.notEqual(testLayout, neighbor);
            // TODO: Figure out how to test the specific values for equality
            // assert.notDeepEqual(testLayout, neighbor);
        });
    });

    describe("function:energy", function() {
        let testLayout: Layout = new Layout();

        it("calculates an \"energy\" for the layout", function() {
            let energy = testLayout.energy();
        });
    });

});