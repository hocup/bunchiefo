import { Dipole } from "./Dipole";
import { Vec3d } from "./Vec3d";

export class World {
    dipoles: Dipole[] = [];

    getFieldAt(pos: Vec3d) {
        return this.dipoles.reduce(
            (acc: Vec3d, dipole: Dipole) => {
                return acc.add(dipole.getFieldAt(pos));
            }, 
            new Vec3d()
        );
    }
}