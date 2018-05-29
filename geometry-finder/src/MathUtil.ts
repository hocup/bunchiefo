import { Vec3d } from "./Vec3d";

export class MathUtil {

    static FUZZ: number = 0.000000001

    static get X_HAT(): Vec3d { return new Vec3d(1, 0, 0); }
    static get Y_HAT(): Vec3d { return new Vec3d(0, 1, 0); }
    static get Z_HAT(): Vec3d { return new Vec3d(0, 0, 1); }

    static randomVec3d(): Vec3d {
        return new Vec3d(Math.random(), Math.random(), Math.random());
    }

    static fuzzyEquals(a: number, b: number, fuzz?: number): boolean {
        if(!fuzz) {
            fuzz = MathUtil.FUZZ;
        }

        return Math.abs(a - b) <= fuzz;
    }

    static vecFuzzyEquals(a: Vec3d, b: Vec3d, fuzz?: number) {
        if(!fuzz) {
            fuzz = MathUtil.FUZZ;
        }

        return a.add(b.scale(-1)).magnitude <= fuzz;
    }

    // A helper function that will constrain a passed in value to be an angle between 0 and 2*Pi
    // or, optionally, between -Pi and +Pi
    static angleWrapAround(v: number, posOnly: boolean = true): number {
        let out = v;
        let max = posOnly ? Math.PI*2 : Math.PI;
        let min = posOnly ? 0         : -Math.PI;        

        while(out > max) {
            out -= Math.PI*2;
        }

        while(out < min) {
            out += Math.PI*2;
        }
        return out;
    }

    // A helper function that will pick an index, with the probablity of picking any valid index in the array
    // proportional to the value at that index.
    static selectIndex(array: number[]): number {
        // TODO: Tim Gunn: make it work
        return -1;
    }
}