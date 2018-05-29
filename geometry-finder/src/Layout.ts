import { IState } from "./SA/IState";
import { Sensor } from "./Sensor";
import { isNull, isNullOrUndefined } from "util";
import { MathUtil } from "./MathUtil";
import { Vec3d } from "./Vec3d";

/*
 * This class serves as the "state" that is being optimized by the Simulated Annealing process.
 * The important bits there are that it can
 * a) find a nearby state
 * b) calculate its own energy 
 * 
 * The state itself should be made up of
 * the radius of the ring
 * positions of magnets on the ring
 * positions of magnetometers
 * 
 * the number of magnetometers and magnets can be inferred (but also changed)
 */
export class Layout implements IState{

    magnets: { angle: number, up: boolean }[] = [];
    magnetometers: Sensor[] = [];
    ringRadius: number = 5; // In cm

    constructor(ringRadius?: number, numMagnets?: number, numMagnetometers?: number) {

        this.ringRadius = isNullOrUndefined(ringRadius) ? 4 + 2*Math.random() : ringRadius;

        numMagnets = isNullOrUndefined(numMagnets) ? Math.floor(1 + 4*Math.random()) : numMagnets;
        for(let i = 0; i < numMagnets; i++) {
            let newMagnet = {
                angle: 2*Math.PI*Math.random(),
                up: Math.random() > 0.5
            };
            this.magnets.push(newMagnet);
        }

        numMagnetometers = isNullOrUndefined(numMagnetometers) ? Math.floor(1 + 4*Math.random()) : numMagnetometers;
        for(let i = 0; i < numMagnetometers; i++) {
            let newMagnetometer = new Sensor(1,1,0,MathUtil.randomVec3d(),new Vec3d(0,0,1));
            this.magnetometers.push(newMagnetometer);
        }
        
    }

    neighbor(): Layout {
        let neighbor = this.clone();

        // modify this cool new clone I have with probabilities:
        let modProbs: {prob: number, mod: (l: Layout) => void}[] = [
            {
                prob: 10, 
                mod: (l: Layout) => {
                    // Move a magnet
                    let magnetIndex = Math.floor(l.magnets.length*Math.random());
                    l.magnets[magnetIndex].angle += MathUtil.angleWrapAround(Math.random() - 0.5);
                }
            },
            {
                prob: 10, 
                mod: (l: Layout) => {
                    // flip a magnet
                    let magnetIndex = Math.floor(l.magnets.length*Math.random());
                    l.magnets[magnetIndex].up = !l.magnets[magnetIndex].up;
                }
            },
            {
                prob: 10,
                mod: (l: Layout) => {

                }
            }
        ];
        // let junk = [
        //     10,      // move a magnet DONE
        //     10,      // move a magnetometer
        //     10,     // flip a magnet
        //     1,      // add a magnet
        //     1,      // remove a magnet
        //     1,      // add a magnetometer
        //     1,      // remove a magnetometer
        // ];


        // normalize
        let probsSum = modProbs.reduce((acc, v) => acc + v.prob, 0);
        if(probsSum != 0) {
            modProbs.map(v => {v.prob /= probsSum;});
        } else {
            throw("Probability sum is zero!")
        }

        return neighbor;
    }

    energy(): number {
        return 0;
    }

    clone(): Layout {
        let clone = new Layout(this.ringRadius, 0, 0);
        clone.magnets = this.magnets.map(
            (magnet) => {
                return { angle:magnet.angle, up:magnet.up };
            }
        );
        
        clone.magnetometers = this.magnetometers.map(sensor => sensor.clone());
        
        //TODO: Actually clone the things

        return clone;
    }
}