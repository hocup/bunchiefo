import { Vec3d } from "./Vec3d";

export class SixAxisState {
    constructor(public position: Vec3d, roll: number, pitch: number, yaw: number) {}
}