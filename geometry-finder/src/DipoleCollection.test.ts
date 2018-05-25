import * as assert from 'assert';
import * as mocha from 'mocha';

import { Dipole } from './Dipole';
import { DipoleCollection } from './DipoleCollection';
import { isNullOrUndefined } from 'util';
import { Vec3d } from './Vec3d';
import { MathUtil } from './MathUtil';

describe("DipoleCollection", function() {
    let dc = new DipoleCollection();

    it("Has Dipoles", function() {
        assert.ok(!isNullOrUndefined(dc.dipoles));
    });

    describe("DipoleCollection.position", function() {
        let newPos = new Vec3d(1,0,0);

        it("exists", function() {
            assert.ok(!isNullOrUndefined(dc));
            assert.ok(!isNullOrUndefined(dc.position));
        });

        it("is not a reference to the actual position", function() {
            let posRef = dc.position;
            posRef.x += 9;
            assert.ok(!MathUtil.vecFuzzyEquals(posRef, dc.position));
        });

        it("can be set", function() {
            dc.position = newPos;
            assert.ok(MathUtil.vecFuzzyEquals(newPos, dc.position));
        });

        it("is not set by reference", function() {
            newPos.x += 2;
            assert.ok(!MathUtil.vecFuzzyEquals(newPos, dc.position));
        })
    });
    

    it("has an orientation", function() {
        assert.ok(!isNullOrUndefined(dc.orientation));
    });

    

});