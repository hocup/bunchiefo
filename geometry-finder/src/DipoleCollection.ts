import { Vec3d } from "./Vec3d";
import { Dipole } from "./Dipole";

export class DipoleCollection{

    dipoles: Dipole[] = [];


    private _position: Vec3d = new Vec3d(0,0,0);
    public get position(): Vec3d {
        return this._position.clone();
    }
    public set position(p: Vec3d) {
        //TODO
    }

    private _orientation: Vec3d = new Vec3d(1,0,0);
    public get orientation(): Vec3d {
        return this._orientation.clone();
    }
    public set orientation(o: Vec3d) {
        //TODO
    }

}