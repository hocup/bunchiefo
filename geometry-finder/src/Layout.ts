import { IState } from "./SA/IState";
import { Sensor } from "./Sensor";
import { isNull, isNullOrUndefined } from "util";
import { MathUtil } from "./MathUtil";
import { Vec3d } from "./Vec3d";
import { SixAxisState } from "./SixAxisState";
import { World } from "./World";
import { Dipole } from "./Dipole";

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
            let newMagnetometer = new Sensor(1,1,0,new Vec3d(Math.random(), Math.random(), 0),new Vec3d(0,0,1));
            newMagnetometer.position.z = 0;
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
                    l.magnets[magnetIndex].angle = MathUtil.angleWrapAround(l.magnets[magnetIndex].angle + MathUtil.boxMullerGaussian()[0]);

                    // TODO: Make sure no magnets are overlapping
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
                    // Move a magnetometer
                    let index = Math.floor(l.magnetometers.length*Math.random());
                    let move = MathUtil.boxMullerGaussian();
                    l.magnetometers[index].position = l.magnetometers[index].position.add(new Vec3d(move[0], move[1], 0));
                    while(l.magnetometers[index].position.magnitude > 1.5) {
                        l.magnetometers[index].position = l.magnetometers[index].position.scale(0.5);
                    }

                    // TODO: make sure no magnetometers are overlapping
                }
            },
            {
                prob: 0,
                mod: (l: Layout) => {
                    // flip a magnetometer

                    // This is pretty pointless, isn't it?
                }
            }
        ];

        // Does this really need to be a one-liner?
        modProbs[MathUtil.selectIndex(modProbs.map(mods => mods.prob))].mod(neighbor);

        return neighbor;
    }

    energy(): number {
        let numSteps = 4;

        let maxAngle = 5 * Math.PI/180; // 10 degrees between maximums
        let angleStepSize = maxAngle*2 / numSteps;

        let maxOffset = 1;
        let offsetStepSize = maxOffset*2 / numSteps;

        // ENERGY
        // Set up a set of positions for the
        let readings: {readings:number[], controllerState: SixAxisState}[] = [];
        for(let x = -maxOffset; x <= maxOffset; x += offsetStepSize) {
            for(let y = -maxOffset; y <= maxOffset; y += offsetStepSize) {
                for(let z = -maxOffset; z <= maxOffset; z += offsetStepSize) {
                    for(let r = -maxAngle; r <= maxAngle; r += angleStepSize) {
                        for(let p = -maxAngle; p <= maxAngle; p += angleStepSize) {
                            for(let yaw = -maxAngle; yaw <= maxAngle; yaw += angleStepSize) {
                                let controllerState = new SixAxisState(new Vec3d(x,y,z), r, p, yaw);
                                readings.push(
                                    {
                                        readings: this.getReadings(controllerState),
                                        controllerState: controllerState
                                    }
                                );
                            }
                        }
                    }                    
                }
            }
        }

        let e: number = 0;
        for(let i = 0; i < readings.length; i++) {
            for(let j = i+1; j < readings.length; j++) {
                let sumSqrs = 0;
                for(let k = 0; k < readings[i].readings.length; k++) {
                    sumSqrs += Math.pow(readings[i].readings[k] - readings[j].readings[k], 2)
                }

                e += 1/(0.05 + Math.sqrt(sumSqrs));
            }
        }

        return e;
    }

    clone(): Layout {
        let clone = new Layout(this.ringRadius, 0, 0);
        clone.magnets = this.magnets.map(
            (magnet) => {
                return { angle:magnet.angle, up:magnet.up };
            }
        );
        
        clone.magnetometers = this.magnetometers.map(sensor => sensor.clone());

        return clone;
    }

    getReadings(controller: SixAxisState): number[] {
        let out = Array<number>(this.magnetometers.length);

        let world = new World();
        this.magnets.map(
            (magnet) => {
                let magnetDipole = new Dipole();
                magnetDipole.position = new Vec3d(this.ringRadius*Math.cos(magnet.angle), this.ringRadius*Math.sin(magnet.angle), 0);
                magnetDipole.normal = new Vec3d(0, 0, magnet.up ? 1 : -1);

                // Handle rotations
                // TODO

                // Handle translations
                magnetDipole.position = magnetDipole.position.add(controller.position);

                world.dipoles.push(magnetDipole);
            }
        )

        for(let i = 0; i < this.magnetometers.length; i++) {
            let fieldAtMagnetometer = world.getFieldAt(this.magnetometers[i].position);
            out[i] = fieldAtMagnetometer.dot(this.magnetometers[i].orientation);
        }

        return out;
    }
}