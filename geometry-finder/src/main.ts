import { Dipole } from "./Dipole";
import { Vec3d } from "./Vec3d";
import { SimulatedAnnealingManager } from "./SA/SimulatedAnnealingManager";
import { Layout } from "./Layout";
import { DisplayManager } from "./display/DisplayManager";

const canvasElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("displayCanvas");
const canvasContext: CanvasRenderingContext2D= canvasElement.getContext("2d");

const displayManager: DisplayManager = new DisplayManager(canvasContext, canvasElement.height, canvasElement.width);


let numSteps = 30000;

let startState = new Layout(5, 3, 3);
let mySAManager = new SimulatedAnnealingManager(startState, numSteps);

function doStep() {
    mySAManager.step();
    updateDisplay(mySAManager.state);
    if(mySAManager.currentStep < numSteps) {
        setImmediate(doStep);
    }
}

function updateDisplay(layout: Layout) {
    console.log(mySAManager.stateEnergy);
    displayManager.drawLayout(layout);
}

doStep();


