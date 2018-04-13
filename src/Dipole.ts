import { Vec3d } from "./Vec3d";

export class Dipole{

    public magnitude: number = 1;
    public normal: Vec3d = new Vec3d(0,0,1);
	constructor(){}

	getFieldAt(pos: Vec3d): Vec3d {


		return [0,0,0];
	}
}
