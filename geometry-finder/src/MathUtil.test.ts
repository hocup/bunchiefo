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
            let v1 = new Vec3d(23*Math.random(),45*Math.random(),3*Math.random());
            let v2 = new Vec3d(v1.x + MathUtil.FUZZ*0.9, v1.y, v1.z);
            assert.ok(MathUtil.vecFuzzyEquals(v1,v2));
        });

        it("should compare vectors correctly with custom fuzz", function() {
            let v1 = new Vec3d(1,1,1);
            let v2 = new Vec3d(-1,-1,-1);
            assert.ok(!MathUtil.vecFuzzyEquals(v1, v2));
            assert.ok(MathUtil.vecFuzzyEquals(v1,v2,12));
        });
    });

    describe("#angleWrapAround()", function() {
        // TODO: more tests?
        it("should wrap angles greater than 2Pi around (when pos only)", function () {
            let testAngle = Math.PI*(2 + 0.3);
            console.log(MathUtil.angleWrapAround(testAngle, true));
            assert.ok(MathUtil.fuzzyEquals(MathUtil.angleWrapAround(testAngle, true), 0.3 * Math.PI));
        });
    });

    describe("#selectIndex()", function() {
        it("should return -1 for an empty array", function () {
            let testArr: number[] = [];
            assert.equal(MathUtil.selectIndex(testArr), -1);
        });

        it("should return -1 for an array that sums to 0", function () {
            let testArr: number[] = [0,0,0,0,0];
            assert.equal(MathUtil.selectIndex(testArr), -1);
        });

        it("should return -1 for an array with any negative values", function () {
            let testArr: number[] = [1,1,1,10,-30];
            assert.equal(MathUtil.selectIndex(testArr), -1);
        });

        it("should return 0 for an array with only one element", function () {
            let testArr: number[] = [1];
            for(let i = 0; i < 100; i++) {
                assert.equal(MathUtil.selectIndex(testArr), 0);
            }
        });

        it("should return an index in proportion to its value", function () {
            let testArr: number[] = [9000, 1000];
            let resultArr: number[] = [0,0];

            for(let i = 0; i < 10000; i++){
                resultArr[MathUtil.selectIndex(testArr)] ++;
            }

            assert.ok(MathUtil.fuzzyEquals(testArr[0], resultArr[0], 100));
            assert.ok(MathUtil.fuzzyEquals(testArr[1], resultArr[1], 100));
        });

        it("should never return an index with a 0", function () {
            let testArr: number[] = [1,1,1,0,1];
        
            for(let i = 0; i < 1000; i ++) {
                assert.ok(MathUtil.selectIndex(testArr) != 3);
            }
        });
    });



});