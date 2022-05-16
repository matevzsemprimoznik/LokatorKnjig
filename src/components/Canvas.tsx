import React, {useLayoutEffect, useState} from 'react';
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
    const [isFirstCornerSelected, setIsFirstCornerSelected] = useState<boolean>(false);
    const [firstCornerCoordinates, setFirstCornerCoordinates] = useState<{ x: number, y: number } | null>(null);

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas!.getContext('2d');
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas: RoughCanvas = rough.canvas(canvas);

        elements.forEach(({element}: { element: any }) => roughCanvas.draw(element));

        window.addEventListener('keyup', handleKeyPress, false);

    }, [elements]);


    const handleMouseDown = (event: any) => {
        const {clientX, clientY}: { clientX: number, clientY: number } = event;

        if (!isFirstCornerSelected) {
            const id = elements.length;
            const element = createElement(id, clientX, clientY, clientX, clientY);
            setElements((prevState: any) => [...prevState, element]);
            setAction(ActionTypes.DRAWING);
            setIsFirstCornerSelected(true);
            setFirstCornerCoordinates({x: clientX, y: clientY});
        } else {
            if (elements.length > 1) {
                const index = elements.length - 1;
                const {x, y} = elements[index];
                const element = createElement(index, x, y, clientX, clientY);

                const elementsCopy = [...elements];
                elementsCopy[index] = element;
                setElements(elementsCopy);
            } else {
                const coords = firstCornerCoordinates;
                const element = createElement(0, coords!.x, coords!.y, clientX, clientY);
                const elementsCopy = [...elements];
                elementsCopy[0] = element;
                setElements(elementsCopy);

            }
            setAction(ActionTypes.NONE);
        }
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
        } else if (action === ActionTypes.NONE && elements.length > 1) {
            const index = elements.length - 1;
            const {x1, y1} = elements[index];
            const element = createElement(index, x1, y1, clientX, clientY);

            const elementsCopy = [...elements];
            elementsCopy[index] = element;
            setElements(elementsCopy);
        }
    }


    const handleMouseUp = (event: any) => {
        // setAction(ActionTypes.NONE);
        const {clientX, clientY}: { clientX: number, clientY: number } = event;

        const id = elements.length - 1;
        const element = createElement(id, clientX, clientY, clientX, clientY);
        setElements((prevState: any) => [...prevState, element]);
        setAction(ActionTypes.DRAWING);
        setIsFirstCornerSelected(true);
        setFirstCornerCoordinates({x: clientX, y: clientY});

    }

    const handleKeyPress = (event: any) => {
        if (event.key === "Escape") {
            if (action === ActionTypes.DRAWING) {
                // setElements(elements.filter((element: any) => element.id !== elements.length - 1));
                elements.length < 1 ? setIsFirstCornerSelected(true) : setIsFirstCornerSelected(false);
            }
            setAction(ActionTypes.NONE);
        }
    }


    return (
        <div>
            <div style={{position: "fixed", maxHeight: "30px", display: "flex", alignItems: "center"}}>
                <button>Risanje sten</button>
                <button>Vstavi omaro</button>
                <p>ESC == unselect</p>
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