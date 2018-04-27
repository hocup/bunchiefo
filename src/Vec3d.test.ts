import * as assert from 'assert';
import * as mocha from 'mocha';

import { Vec3d } from './Vec3d';

describe("Vec3d", function() {
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
});