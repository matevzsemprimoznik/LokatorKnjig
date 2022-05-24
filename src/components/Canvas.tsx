import React, {useLayoutEffect, useState} from 'react';
import rough from "roughjs/bin/rough";
import {RoughCanvas} from "roughjs/bin/canvas";
import {Drawable} from "roughjs/bin/core";

const generator = rough.generator();


enum ActionTypes {
    NONE = "NONE",
    DRAWING = "DRAWING",
    MOVING = "MOVING",
    SELECTING = "SELECTING",
}

enum DrawingElement {
    NONE = "NONE",
    DOOR = "DOOR",
    WALL = "WALL",
    BOOKSHELF = "BOOKSHELF"
}

type ElementType = {
    id: number,
    x: number,
    y: number,
    x1: number,
    y1: number,
    element: Drawable,
    offsetX?: number,
    offsetY?: number,
};


const Canvas = () => {


    const [wallElements, setWallElements] = useState<Array<ElementType>>([]);
    const [bookshelves, setBookshelves] = useState<Array<ElementType>>([]);

    const [currentDrawingBookshelf, setCurrentDrawingBookshelf] = useState<Array<ElementType>>([]);
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);

    const [action, setAction] = useState<ActionTypes>(ActionTypes.NONE);
    const [drawingElement, setDrawingElement] = useState<DrawingElement>(DrawingElement.NONE);

    const [isFirstCornerSelected, setIsFirstCornerSelected] = useState<boolean>(false);
    const [wallNotSettled, setWallNotSettled] = useState<boolean>(false);
    const [wallEdgePressed, setWallEdgePressed] = useState<boolean>(false);


    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas!.getContext('2d');
        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas: RoughCanvas = rough.canvas(canvas);

        [...bookshelves, ...currentDrawingBookshelf, ...wallElements].forEach(({element}: { element: Drawable }) => roughCanvas.draw(element))

        window.addEventListener('keyup', handleKeyPress, false);

        return () => window.removeEventListener("keyup", handleKeyPress);

    }, [wallElements, bookshelves, currentDrawingBookshelf]);


    const createElement = (id: number, x: number, y: number, x1: number, y1: number, type: DrawingElement) => {

        if (drawingElement === DrawingElement.BOOKSHELF) {
            const element: Drawable = generator.rectangle(x, y, 50, 30, {
                strokeWidth: 1,
                fillStyle: 'solid',
                fill: 'rgb(49,38,15)',
                roughness: 0
            });
            x1 = x + 50;
            y1 = y + 30;
            return {id, x, y, x1, y1, element}
        } else if (drawingElement === DrawingElement.WALL) {
            const element: Drawable = generator.line(x, y, x1, y1, {strokeWidth: 5});
            return {id, x, y, x1, y1, element}
        }
    }

    const updateElement = (id: number, x: number, y: number, clientX: number, clientY: number, type: DrawingElement) => {
        const element = createElement(id, x, y, clientX, clientY, type);

        const bookshelfCopy = [...bookshelves];
        bookshelfCopy[id] = element as ElementType;

        setBookshelves(bookshelfCopy);
    }

    const getElementAtPosition = (x: number, y: number, bookshelves: Array<ElementType>) => {
        return bookshelves.find((bookshelf: ElementType) => isCursorOnElement(x, y, bookshelf));
    }

    const isCursorOnElement = (clientX: number, clientY: number, element: ElementType): boolean => {
        const {x, y, x1, y1}: { x: number, y: number, x1: number, y1: number } = element;

        const minX = Math.min(x, x1);
        const maxX = Math.max(x, x1);
        const minY = Math.min(y, y1);
        const maxY = Math.max(y, y1);
        return clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY;
    }

    const calculateCoordinates = (clientX: number, clientY: number): { clientX: number, clientY: number } => {
        /*round to 10 nearest*/
        // Math.ceil(N / 10) * 10;

        /*round to 5 nearest*/
        clientX = (clientX % 5) >= 2.5 ? parseInt(String(clientX / 5)) * 5 + 5 : parseInt(String(clientX / 5)) * 5;
        clientY = (clientY % 5) >= 2.5 ? parseInt(String(clientY / 5)) * 5 + 5 : parseInt(String(clientY / 5)) * 5;

        return {clientX, clientY};
    }


    const handleMouseDown = (event: any) => {
        const {
            clientX,
            clientY
        } = drawingElement === DrawingElement.BOOKSHELF ? calculateCoordinates(event.clientX, event.clientY) : event;

        /*drawing walls*/
        if (drawingElement === DrawingElement.WALL && action === ActionTypes.NONE) {
            if (!isFirstCornerSelected) {
                setWallEdgePressed(true);
                const id = wallElements.length;
                const element = createElement(id, clientX, clientY, clientX, clientY, DrawingElement.WALL);
                setWallElements((prevState: any) => [...prevState, element]);
                setIsFirstCornerSelected(true);
            }
            setAction(ActionTypes.DRAWING);
        } else if (drawingElement === DrawingElement.WALL && action === ActionTypes.DRAWING) {

        }

        /*drawing bookshelves*/
        if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.DRAWING) {
            const index = bookshelves.length;
            const element = createElement(index, clientX, clientY, clientX, clientY, DrawingElement.BOOKSHELF);
            setBookshelves((prevState: any) => [...prevState, element]);

        }
        // select bookshelf at cursor position
        if (action === ActionTypes.SELECTING) {
            const selectedElement = getElementAtPosition(clientX, clientY, bookshelves);
            if (selectedElement) {
                // const offsetX = clientX - selectedElement.x1;
                // const offsetY = clientY - selectedElement.y1;
                // setSelectedElement({...selectedElement, offsetX, offsetY});
                setSelectedElement(selectedElement);
                // TODO change element color to blue -> update element
                // !! DOES NOT WORK YET
                bookshelves.map(({
                                     element,
                                     id,
                                     x,
                                     x1,
                                     y,
                                     y1
                                 }: { element: Drawable, id: number, x: number, y: number, x1: number, y1: number }) => (id === selectedElement.id) && updateElement(id, x, y, x1, y1, DrawingElement.BOOKSHELF))
            } else {
                setSelectedElement(null);
            }
        }
    }


    const handleMouseMove = (event: any) => {
        const {
            clientX,
            clientY
        } = drawingElement === DrawingElement.BOOKSHELF ? calculateCoordinates(event.clientX, event.clientY) : event;

        if (drawingElement === DrawingElement.WALL && action === ActionTypes.DRAWING) {
            setWallNotSettled(true);
            const index = wallElements.length - 1;
            const {x, y} = wallElements[index];
            const element = createElement(index, x, y, clientX, clientY, DrawingElement.WALL);

            const wallElementsCopy = [...wallElements];
            wallElementsCopy[index] = element as ElementType;
            setWallElements(wallElementsCopy);
        }

        if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.SELECTING) {
            if (getElementAtPosition(clientX, clientY, bookshelves)) {
                event.target.style.cursor ="move";
            } else {
                event.target.style.cursor = "default";
            }
        }


        if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.DRAWING && currentDrawingBookshelf !== null) {
            const element = createElement(0, Math.round(clientX), Math.round(clientY), Math.round(clientX), Math.round(clientY), DrawingElement.BOOKSHELF);
            const copy = [...currentDrawingBookshelf];
            copy[0] = element as ElementType;
            setCurrentDrawingBookshelf(copy);
        } else if (selectedElement && action === ActionTypes.SELECTING) {
            setAction(ActionTypes.MOVING);
        } else if (selectedElement && action === ActionTypes.MOVING) {

            const {id, offsetY, offsetX} = selectedElement;

            if (offsetX && offsetY) {
                const newX1 = clientX - offsetX;
                const newY1 = clientY - offsetY;
                updateElement(id, newX1, newY1, 0, 0, DrawingElement.BOOKSHELF)
            } else {
                updateElement(id, clientX, clientY, 0, 0, DrawingElement.BOOKSHELF)
            }
        }
    }


    const handleMouseUp = (event: any) => {

        const {clientX, clientY}: { clientX: number, clientY: number } = event;

        if (action === ActionTypes.DRAWING && drawingElement === DrawingElement.WALL) {
            if (!isFirstCornerSelected) {
                // TODO -> function for finding nearest point (wall edge)
            } else {

                const index = wallElements.length - 1;
                const wallPiece = wallElements[index];
                const element = createElement(index, wallPiece.x1, wallPiece.y1, clientX, clientY, DrawingElement.WALL);

                const wallElementsCopy = [...wallElements, element] as ElementType[];
                setWallElements(wallElementsCopy);
                setWallEdgePressed(false);
            }
        }


        if (selectedElement && action === ActionTypes.MOVING) {
            setAction(ActionTypes.NONE);
            setSelectedElement(null);
            event.target.style.cursor = "default";
        }

    }

    const handleKeyPress = (event: any) => {
        if (event.key === "Escape") {
            if (action === ActionTypes.DRAWING && drawingElement === DrawingElement.BOOKSHELF) {
                setCurrentDrawingBookshelf([]);
            } else if (drawingElement === DrawingElement.WALL && wallNotSettled) {
                const wallElementsCopy = [...wallElements];
                const newState = wallElements.pop();
                if (wallElementsCopy.length !== 1) {

                } else {
                    setIsFirstCornerSelected(false);
                }
                setWallElements(wallElementsCopy.filter((element: ElementType) => element.id !== newState?.id));
                // wallElements.length < 1 ? setIsFirstCornerSelected(true) : setIsFirstCornerSelected(false);
            }
            setAction(ActionTypes.NONE);
        }
    }

    // element selecting action
    const handleElementSelection = () => {
        setDrawingElement(DrawingElement.BOOKSHELF);
        setAction(ActionTypes.SELECTING);
        setSelectedElement(null);
    }

    // select action and element we are editing
    const handleDrawingSelection = (drawingElement: DrawingElement) => {
        if (drawingElement === DrawingElement.WALL) {
            setAction(ActionTypes.NONE);
            setDrawingElement(drawingElement);
        } else if (drawingElement === DrawingElement.BOOKSHELF) {
            setAction(ActionTypes.DRAWING);
            setDrawingElement(drawingElement);
        }

    }

    const handleDoubleClick = (event: any) => {
        const {clientX, clientY}: { clientX: number, clientY: number } = event;

        const selectedElement = getElementAtPosition(clientX, clientY, bookshelves);
        if (selectedElement) {
            setSelectedElement(selectedElement);
            // TODO change element color to blue -> update element
            // !! DOES NOT WORK YET
            bookshelves.map(({
                                 element,
                                 id,
                                 x,
                                 x1,
                                 y,
                                 y1
                             }: { element: Drawable, id: number, x: number, y: number, x1: number, y1: number }) => (id === selectedElement.id) && updateElement(id, x, y, x1, y1, DrawingElement.BOOKSHELF))
        }
    }


    // deleting bookshelves
    const handleElementDelete = () => {
        if (selectedElement) {
            const newState = bookshelves.filter((element: ElementType) => element.id !== selectedElement.id);
            setBookshelves(newState);
            setSelectedElement(null);
        }
    }



    return (
        <div>
            <div style={{position: "fixed", maxHeight: "30px", display: "flex", alignItems: "center"}}>
                <button onClick={() => handleDrawingSelection(DrawingElement.WALL)}>Risanje sten</button>
                <button onClick={() => handleDrawingSelection(DrawingElement.BOOKSHELF)}>Vstavi omaro</button>
                <button onClick={handleElementSelection}>Izbira elementov</button>
                <button onClick={handleElementDelete}>Izbriši element</button>
                <p>ESC == unselect action</p>
            </div>
            <canvas id="canvas" width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onDoubleClick={handleDoubleClick}

                    style={{backgroundColor: "lightgray"}}
            ></canvas>
        </div>
    );
};

export default Canvas;