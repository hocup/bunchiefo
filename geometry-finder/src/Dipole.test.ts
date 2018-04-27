import * as assert from 'assert';
import * as mocha from 'mocha';

import { Dipole } from './Dipole';
import { isNullOrUndefined } from 'util';
import { Vec3d } from './Vec3d';
import { MathUtil } from './MathUtil';

describe("Dipole", function() {
    let d = new Dipole();

    it("has a magnitude", function() {
        assert.ok(!isNullOrUndefined(d.magnitude));
        assert.ok(d.magnitude > 0);
    });

    it("has a normal vector", function() {
        assert.ok(!isNullOrUndefined(d.normal));
        assert.equal(d.normal.magnitude, 1);
    });

    it("has a position", function() {
        assert.ok(!isNullOrUndefined(d.position));
    });

    describe("#getFieldAt()", function() {
        let f: Vec3d = d.getFieldAt(new Vec3d(1,0,0));

        it("gets the field at a passed in position", function() {
            assert.ok(!isNullOrUndefined(f));
        });

        it("has a reasonable field direction", function() {
            assert.ok(MathUtil.fuzzyEquals(f.x, 0));
            assert.ok(MathUtil.fuzzyEquals(f.y, 0));
            assert.ok(!MathUtil.fuzzyEquals(f.z, 0));
        });

    });
});