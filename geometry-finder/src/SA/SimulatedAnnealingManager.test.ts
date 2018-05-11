import * as assert from 'assert';
import * as mocha from 'mocha';

import { SimulatedAnnealingManager } from "./SimulatedAnnealingManager";
import { IState } from './IState';
import { isNullOrUndefined } from 'util';

class TestStateImplementation implements IState{
    
    constructor(
        public x: number, 
        public y: number
    ){}

    neighbor(): TestStateImplementation {
        return new TestStateImplementation(
            this.x + 50*(Math.random() - 0.5), 
            this.y + 50*(Math.random() - 0.5)
        );
    }

    energy(): number {
        let k = 2;
        return 0.5 * k * (Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
}

describe("SimulatedAnnealingManager", function() {
    describe("#constructor()", function() {
        it("creates default annealing schedule and transition probability ftns", function(){
            let initState = new TestStateImplementation(400,400);
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(initState);

            assert.ok(!isNullOrUndefined(testMngr));
            assert.ok(!isNullOrUndefined(testMngr.annealingSchedule));
            
            assert.equal(testMngr.annealingSchedule(0.5), 1);
            assert.equal(testMngr.annealingSchedule(1), 0);
            assert.equal(testMngr.annealingSchedule(0), Infinity);
            assert.ok(testMngr.annealingSchedule(Math.random()) > 0);

            assert.ok(!isNullOrUndefined(testMngr.transitionProb));

            assert.equal(testMngr.transitionProb(200, 199, Math.random()*400), 1);
            assert.equal(testMngr.transitionProb(1,1, Infinity), 1);

        });

        it("accepts a custom annealing schedule", function() {
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(2343,234),
                123,
                (n: number) => {return n;}
            );

            for(let i = 0; i < 12; i++) {
                let testVal = Math.random();
                assert.equal(testVal, testMngr.annealingSchedule(testVal));
            }
        });
        it("accepts a custom transition probability function", function() {
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(2343,234),
                123,
                null,
                (a: number, b: number, t: number) => {return a + b + t;}
            );

            for(let i = 0; i < 12; i++) {
                let testVal = Math.random();
                assert.equal(3*testVal, testMngr.transitionProb(testVal, testVal, testVal));
            }
        });
    });

    describe("#step()", function() {
        it("doesn't do anything if the manager has reached max steps", function() {
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(500,2234)
            );

            let originalState = testMngr.state;
            let originalEnergy = testMngr.stateEnergy;

            testMngr.currentStep = testMngr.maxSteps;

            testMngr.step();
            assert.equal(testMngr.currentStep, testMngr.maxSteps);
            assert.equal(testMngr.state, originalState);
            assert.equal(testMngr.stateEnergy, originalEnergy);
            
        });
        it("advances the current step", function() {
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(500,2234)
            );

            let originalStep = testMngr.currentStep;
            testMngr.step();
            assert.equal(originalStep + 1, testMngr.currentStep);
        });
        it("updates the state when the transition probability is 1", function() {
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(500,2234),
                10000,
                null,
                (e1, e2, temp) => {return 1;}
            );

            let states: TestStateImplementation[] = [];
            for(let i = 0; i < 20; i++) {
                states.push(testMngr.state);
                testMngr.step();
            }

            for(let i = 1; i < states.length; i++) {
                assert.notEqual(states[i-1], states[i]);
            }
        });
        it("updates the state in proportion to the transition probability", function() {
            let prob: number = Math.random();
            let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
                new TestStateImplementation(500,2234),
                10000,
                null,
                (e1, e2, temp) => {return prob;}
            );

            let same = 0;

            while(testMngr.currentStep < testMngr.maxSteps) {
                let prevState = testMngr.state;
                testMngr.step();

                if(prevState == testMngr.state) {
                    same++;
                }
            }

            let probDiff = 1 - prob - same/testMngr.maxSteps;
            assert.ok(Math.abs(probDiff) < 0.05);
        });
    });

    it("Tends towards (0,0) in the test example", function() {
        let initState = new TestStateImplementation(400,400);
        let testMngr = new SimulatedAnnealingManager<TestStateImplementation>(
            initState
        );

        while(testMngr.currentStep < testMngr.maxSteps) {
            testMngr.step();
        }

        assert.ok(Math.abs(testMngr.state.x) < initState.x);
        assert.ok(Math.abs(testMngr.state.y) < initState.y);

    });
});