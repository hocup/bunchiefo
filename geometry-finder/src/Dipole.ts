import { Vec3d } from "./Vec3d";

export class Dipole{

    public magnitude: number = 1;
	public normal: Vec3d = new Vec3d(0,0,1);
	public position: Vec3d = new Vec3d();
	
	constructor(){}

	getFieldAt(pos: Vec3d): Vec3d {
		let m = this.normal.scale(this.magnitude);
		let r = pos.add(this.position.scale(-1));
		
		// TODO figure out units
		let out = r.scale(3*m.dot(r)/Math.pow(r.magnitude, 2)).add(m.scale(-1)).scale(1/Math.pow(r.magnitude, 3));

		return out;
	}
}
