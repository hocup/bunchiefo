import { Dipole } from "./Dipole";
import { Vec3d } from "./Vec3d";
import { SimulatedAnnealingManager } from "./SA/SimulatedAnnealingManager";
import { Layout } from "./Layout";

let numSteps = 30000;

let startState = new Layout(5, 5, 4);
let mySAManager = new SimulatedAnnealingManager(startState, numSteps);

for(let i = 0; i < numSteps; i++) {
    mySAManager.step();
    console.log(mySAManager.stateEnergy);
    
}
console.log(mySAManager.state.magnets);
console.log(mySAManager.state.magnetometers);



