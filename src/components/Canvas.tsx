import React, {KeyboardEventHandler, useLayoutEffect, useState} from 'react';
import rough from "roughjs/bin/rough";
import {RoughCanvas} from "roughjs/bin/canvas";


const generator = rough.generator();


enum ActionTypes {
    NONE = "NONE",
    DRAWING = "DRAWING",
    MOVING = "MOVING",
}


const createElement = (id: number, x: number, y: number, x1: number, y1: number) => {
    const element: any = generator.line(x, y, x1, y1, {strokeWidth: 4});
    return {id, x, y, x1, y1, element}
}


const Canvas = () => {

    const [elements, setElements] = useState<any>([]);
    const [action, setAction] = useState<ActionTypes>(ActionTypes.NONE);

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas!.getContext('2d');
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas: RoughCanvas = rough.canvas(canvas);

        elements.forEach(({element}: { element: any }) => roughCanvas.draw(element));

        window.addEventListener('keyup', handleKeyPress, false);

    }, [elements]);


    const handleMouseDown = (event: any) => {
        const {clientX, clientY} = event;

            const id = elements.length;
            const element = createElement(id, clientX, clientY, clientX, clientY);
            setElements((prevState: any) => [...prevState, element]);
            setAction(ActionTypes.DRAWING);

    }


    const handleMouseMove = (event: any) => {
        const {clientX, clientY} = event;

        if (action === ActionTypes.DRAWING) {
            const index = elements.length - 1;
            const {x, y} = elements[index];
            const element = createElement(index, x, y, clientX, clientY);

            const elementsCopy = [...elements];
            elementsCopy[index] = element;
            setElements(elementsCopy);

        }
    }


    const handleMouseUp = (event: any) => {
        setAction(ActionTypes.NONE);

    }

    const handleKeyPress = (event: any) => {
        if (event.key === "Escape") {
            if (action === ActionTypes.DRAWING) {
                setElements(elements.filter((element: any) => element.id !== elements.length - 1));
                setAction(ActionTypes.NONE);

            }
        }
    }


    return (
        <div>
            <div style={{position: "fixed", maxHeight: "30px", display: "flex", alignItems: "center"}}>
                <button>Risanje sten</button>
                <button>Vstavi omaro</button>
                <p>ESC == unselect last</p>
            </div>
            <canvas id="canvas" width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{backgroundColor: "lightgray"}}
            ></canvas>
        </div>
    );
};

export default Canvas;