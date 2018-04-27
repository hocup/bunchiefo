import * as assert from 'assert';
import * as mocha from 'mocha';

import { Vec3d } from './Vec3d';
import { MathUtil } from './MathUtil';
import { isNullOrUndefined } from 'util';

describe("Vec3d", function() {
    it("has components", function() {
        let v = MathUtil.randomVec3d();
        assert.ok(!isNullOrUndefined(v.x));
        assert.ok(!isNullOrUndefined(v.y));
        assert.ok(!isNullOrUndefined(v.z));
    });

    describe("#magnitude", function() {
        it("should be the length of a simple vector", function () {
            let v1 = new Vec3d(0,0,1);
            assert.equal(v1.magnitude, 1);
        });

        it("should be the length of a more complex vector", function () {
            let v = new Vec3d(3,4,0);
            assert.equal(v.magnitude, 5);
        });

    });

    describe("#clone()", function () {
        let v1 = new Vec3d(Math.random(), Math.random(), Math.random());
        let v2 = v1.clone();

        it("should result in an equivalent object", function () {
            assert.deepEqual(v1, v2);
        })

        it("should create a brand new object", function() {
            // Change the clone and test it against the original to make sure only one changed
            v2.x = v2.x + 1;

            assert.notEqual(v1.magnitude, v2.magnitude);
            assert.notEqual(v1.x, v2.x);
        });

    });

    describe("#dot(v: Vec3d)", function () {
        let v1 = new Vec3d(1);
        let v2 = new Vec3d(2);
        it("should commute", function() {
            let dotProd1 = v1.dot(v2);
            let dotProd2 = v2.dot(v1);
            assert.equal(dotProd1, dotProd2);
        });

        it("should return a number (close to) zero for perpendicular vectors", function () {
            let a = Math.random()*Math.PI * 2;
            let v1 = new Vec3d(Math.cos(a), Math.sin(a));
            let v2 = new Vec3d(Math.cos(Math.PI/2 + a), Math.sin(Math.PI/2 + a));

            
            assert.ok(MathUtil.fuzzyEquals(v1.dot(v2),0));
        });

        it("should return a number close to 1 for two parallel unit vectors", function() {
            let a = Math.random() * Math.PI * 2;
            let v1 = new Vec3d(0, Math.cos(a), Math.sin(a));
            let v2 = v1.clone();

            assert.ok(MathUtil.fuzzyEquals(1, v2.dot(v1)));
        });

        it("should return the projection of one vector on another", function () {
            let v1 = new Vec3d(Math.random(), Math.random(), Math.random());

            assert.equal(new Vec3d(1).dot(v1), v1.x);
            assert.equal(new Vec3d(0,1).dot(v1), v1.y);
            assert.equal(new Vec3d(0,0,1).dot(v1), v1.z);
        });
    });

    describe.only("#rotate(axis: Vec3d, a: number)", function() {
        it("does not change the magnitude of the vector", function() {
            let v1 = new Vec3d(1,0,0);
            let rotated = v1.rotate(MathUtil.Y_HAT, Math.PI/2);

            assert.ok(MathUtil.fuzzyEquals(rotated.magnitude, 1));

        });
    });
});