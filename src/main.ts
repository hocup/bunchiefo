import {Dipole} from "./Dipole";
import { Vec3d } from "./Vec3d";

console.log("HELLO WORLD");

let myDipole = new Dipole();
console.log(myDipole.getFieldAt(new Vec3d(0,4,0)));


