import * as assert from 'assert';
import * as mocha from 'mocha';

import { MathUtil } from './MathUtil';
import { isNullOrUndefined } from 'util';
import { Vec3d } from './Vec3d';

describe("MathUtil", function() {
    describe("#FUZZ", function() {
        it("should exist", function() {
            let fuzz: number = MathUtil.FUZZ;
            assert.ok(!isNullOrUndefined(fuzz));
        });

        it("should be positive, non zero", function () {
            assert.ok(MathUtil.FUZZ > 0);
        });

        it("should be pretty small", function() {
            // Picking a small value for the fuzz to be smaller than
            // just as a secondary check, if I ever change MathUtils.FUZZ
            assert.ok(MathUtil.FUZZ < 0.00000001);
        });
    });

    describe("#randomVec3d()", function() {
        it("should return a Vec3d", function() {
            let o: Vec3d = MathUtil.randomVec3d();
            assert.ok(!isNullOrUndefined(o));
        });
    });

    describe("#fuzzyEquals()", function() {
        it("should compare numbers correctly with default fuzz", function() {
            assert.ok(MathUtil.fuzzyEquals(1,1.0000000001));
            assert.ok(MathUtil.fuzzyEquals(12,12 + MathUtil.FUZZ * 0.9));
            assert.ok(MathUtil.fuzzyEquals(12,12 - MathUtil.FUZZ * 0.999));
            assert.ok(!MathUtil.fuzzyEquals(123,123 + MathUtil.FUZZ * 1.1));
        });

        it("should compare numbers correctly with a custom fuzz", function() {
            assert.ok(MathUtil.fuzzyEquals(0,56,100));
            assert.ok(!MathUtil.fuzzyEquals(-50,56,100));
        });

    });

    describe("#vecFuzzyEquals()", function() {
        it("should compare vectors correctly with default fuzz", function() {
            throw("todo");
        });

        it("should compare vectors correctly with custom fuzz", function() {
            throw("todo");
        });
    });
});