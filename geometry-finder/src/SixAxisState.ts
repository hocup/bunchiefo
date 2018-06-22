import { Vec3d } from "./Vec3d";

export class SixAxisState {
    constructor(public position: Vec3d, public roll: number, public pitch: number, public yaw: number) {}
}