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

    rotate(axis: Vec3d, angle: number): Vec3d {
        //TODO
        return null;
    }
}
