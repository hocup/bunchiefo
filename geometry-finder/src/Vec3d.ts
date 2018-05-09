import { isNullOrUndefined } from "util";
import { MathUtil } from "./MathUtil";

export class Vec3d {
    get magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z,2));
    }

    constructor(
        public x: number = 0,
        public y: number = 0,
        public z: number = 0
    ) {}

    clone() : Vec3d {
        return new Vec3d(this.x, this.y, this.z);
    }

    dot(other: Vec3d): number {
        return this.x*other.x + this.y*other.y + this.z*other.z;
    }

    cross(other: Vec3d): Vec3d {
        return new Vec3d(
            this.z*other.y - this.y*other.z,
            this.z*other.x - this.x*other.z,
            this.x*other.y - this.y*other.x
        );
    }

    add(other: Vec3d): Vec3d {
        return new Vec3d(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        );
    }

    scale(scale: number): Vec3d {
        let out = this.clone();
        out.x *= scale;
        out.y *= scale;
        out.z *= scale;

        return out;
    }

    normalized(fuzz?: number): Vec3d {
        if(isNullOrUndefined(fuzz)) {
            fuzz = MathUtil.FUZZ;
        }

        if(this.magnitude < fuzz) {
            throw("Error normalizing a vector that is too small")
        } else {
            return this.scale(1/this.magnitude);
        }
    }

    rotate(axis: Vec3d, angle: number): Vec3d {
        // Thanks wikipedia!
        // https://en.wikipedia.org/wiki/Rotation_matrix
        let n = axis.normalized();
        let x = 
                this.x*(Math.cos(angle)  + Math.pow(n.x, 2)*(1 - Math.cos(angle)))
                + this.y*(n.x*n.y*(1 - Math.cos(angle)) - n.z*Math.sin(angle))
                + this.z*(n.x*n.z*(1 - Math.cos(angle)) + n.y*Math.sin(angle));
        let y = 
                this.x*(n.x*n.y*(1 - Math.cos(angle)) + n.z*Math.sin(angle))
                + this.y*(Math.cos(angle) + n.y*n.y*(1 - Math.cos(angle)))
                + this.z*(n.y*n.z*(1 - Math.cos(angle)) - n.x*Math.sin(angle));
        let z = 
                this.x*(n.z*n.x*(1 - Math.cos(angle)) - n.y*Math.sin(angle))
                + this.y*(n.z*n.y*(1 - Math.cos(angle)) + n.x*Math.sin(angle))
                + this.z*(Math.cos(angle) + n.z*n.z*(1 - Math.cos(angle)));
        return new Vec3d(x, y, z);
    }
}
