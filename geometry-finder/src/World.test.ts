import * as assert from 'assert';
import * as mocha from 'mocha';

import { World } from './World';
import { isNullOrUndefined } from 'util';

describe("World", function() {
    let newWorld: World = new World();

    it("has dipoles", function() { 
        assert.ok(!isNullOrUndefined(newWorld));
        assert.ok(!isNullOrUndefined(newWorld.dipoles));
    });

    describe("#getFieldAt()", function() {
        it("gets the field", function() {
            
        });
    });
});