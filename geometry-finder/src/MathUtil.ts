import { Vec3d } from "./Vec3d";

export class MathUtil {

    static FUZZ: number = 0.000000001

    static X_HAT: Vec3d = new Vec3d(1, 0, 0);
    static Y_HAT: Vec3d = new Vec3d(0, 1, 0);
    static Z_HAT: Vec3d = new Vec3d(0, 0, 1);

    static randomVec3d(): Vec3d {
        return new Vec3d(Math.random(), Math.random(), Math.random());
    }

    static fuzzyEquals(a: number, b: number, fuzz?: number): boolean {
        if(!fuzz) {
            fuzz = MathUtil.FUZZ;
        }

        return Math.abs(a - b) <= fuzz;
    }
}