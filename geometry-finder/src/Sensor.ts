import { Vec3d } from "./Vec3d";
import { Dipole } from "./Dipole";

export class Sensor {

    constructor(
        public multiplier: number = 1, 
        public cutoff: number = 1,
        public position: Vec3d,
        public orientation: Vec3d
    ){

    }

    getReading(field: Vec3d){
        // TODO
    }


}