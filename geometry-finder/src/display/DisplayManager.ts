import { Layout } from "../Layout";

export class DisplayManager{
    scale: number = 1;

    constructor(private context: CanvasRenderingContext2D, private height: number, private width: number){
        
    }

    drawLayout(layout: Layout) {
        console.log("DRAWING CANVAS")
        this.scale = 0.45*Math.min(this.height, this.width)/layout.ringRadius;

        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.width, this.height);

        // Draw the center, just for kicks
        this.context.beginPath();
        this.context.strokeStyle = "gray";
        this.drawCircle(0,0,0.1);
        this.context.stroke();

        // Draw the outer ring center
        this.context.beginPath();
        this.context.strokeStyle = "black";
        this.drawCircle(0,0,5);
        this.context.stroke()

        // Draw the plausable mount for the magnetometers
        this.context.beginPath();
        this.context.strokeStyle = "black";
        this.drawCircle(0,0,layout.centerPlatformSize);
        this.context.stroke();


        // Draw the magnets
        for(let i = 0; i < layout.magnets.length; i++) {
            this.context.beginPath();
            this.context.fillStyle = layout.magnets[i].up ? "red" : "blue";
            this.drawCircle(
                layout.ringRadius*Math.cos(layout.magnets[i].angle),
                layout.ringRadius*Math.sin(layout.magnets[i].angle),
                layout.magnetSize
            );
            this.context.fill();
            this.context.stroke();
        }

        // Draw the magnetometers
        for(let i = 0; i < layout.magnetometers.length; i++) {
            this.context.beginPath();
            this.drawSquare(layout.magnetometers[i].position.x, layout.magnetometers[i].position.y, layout.magnetometerSize);
            this.context.stroke();
        }
    }

    drawCircle(x: number, y: number, r: number) {
        this.context.arc(this.width/2 + x*this.scale, this.height/2 + y*this.scale, r*this.scale, 0, Math.PI*2);
    }

    drawSquare(x: number, y: number, halfSide: number) {
        this.context.rect(
            this.width/2 + (x - halfSide)*this.scale, 
            this.height/2 + (y - halfSide)*this.scale, 
            this.scale*halfSide*2, 
            this.scale*halfSide*2
        );
    }
}