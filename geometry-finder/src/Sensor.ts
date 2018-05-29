import { Vec3d } from "./Vec3d";
import { Dipole } from "./Dipole";

export class Sensor {

    constructor(
        public multiplier: number = 1, 
        public cutoff: number = 1,
        public offset: number = 0,
        public position: Vec3d,
        public orientation: Vec3d
    ){

    }

    getReading(field: Vec3d){
        // Get the projection of the field
        let fieldProjection: number = field.dot(this.orientation);
        return Math.min(this.cutoff, Math.max(-this.cutoff, this.offset + fieldProjection * this.multiplier));
    }

    clone() {
        return new Sensor(this.multiplier, this.cutoff, this.offset, this.position.clone(), this.orientation.clone());
    }

}