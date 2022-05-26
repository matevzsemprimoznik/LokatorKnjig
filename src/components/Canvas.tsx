import React, {ChangeEvent, useEffect, useLayoutEffect, useRef, useState} from 'react';
import rough from "roughjs/bin/rough";
import {RoughCanvas} from "roughjs/bin/canvas";
import {Drawable} from "roughjs/bin/core";
import '../styles/2d_canvas_page/Canvas.css';

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
    rotation?: number,
    nb_of_shelves?: number
    udk?: Array<string>
};

type DataType = {
    sh_length: number,
    sh_height: number
    sh_rotation: number
}


const bs_initial_details = {
    sh_length: 0,
    sh_height: 0,
    sh_rotation: 0
}


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
        const [leftDivOpen, setLeftDivOpen] = useState<boolean>(false);

        const [bs_details, setBs_details] = useState<DataType>(bs_initial_details);
        const [drawingBlock, setDrawingBlock] = useState<boolean>(false);
        const [sh_image, setSh_image] = useState<string>("../../Shelf_rot_to.png");

        const [currentDrawingBlock, setCurrentDrawingBlock] = useState<Array<ElementType>>([]);
        const [blockSplitOnPieces, setBlockSplitOnPieces] = useState<Array<ElementType>>([]);


        useLayoutEffect(() => {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas!.getContext('2d');
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            const roughCanvas: RoughCanvas = rough.canvas(canvas);

            bookshelves.map((item: ElementType, index: number) => item.id = index);

            [...bookshelves, ...currentDrawingBookshelf, ...wallElements, ...currentDrawingBlock].forEach(({element}: { element: Drawable }) => roughCanvas.draw(element))

            window.addEventListener('keyup', handleKeyPress, false);

            return () => window.removeEventListener("keyup", handleKeyPress);

        }, [wallElements, bookshelves, currentDrawingBookshelf, currentDrawingBlock]);

        useEffect(() => {
            getImagePath(bs_details.sh_rotation);
        }, [bs_details.sh_rotation])

        const getImagePath = (rotation: number) => {
            switch (Number(rotation)) {
                case 0:
                    setSh_image("../../Shelf_rot_to.png")
                    break;
                case 1:
                    setSh_image("../../Shelf_rot_left.png")
                    break;
                case 2:
                    setSh_image("../../Shelf_rot_against.png")
                    break;
                case 3:
                    setSh_image("../../Shelf_rot_right.png")
                    break;
            }
        }

        const createElement = (id: number, x: number, y: number, x1: number, y1: number, type: DrawingElement, rotation?: number) => {

            if (drawingElement === DrawingElement.BOOKSHELF) {
                if (drawingBlock) {
                    let [blockSplit, block] = makeBlockPiece(x, y);
                    setCurrentDrawingBlock(block);
                    setBlockSplitOnPieces(blockSplit);
                }

                if (rotation === 0 || rotation === 180) {
                    const element: Drawable = generator.rectangle(x, y, 50, 30, {
                        strokeWidth: 1,
                        fillStyle: 'solid',
                        fill: 'rgb(49,38,15)',
                        roughness: 0
                    });

                    x1 = x + 50;
                    y1 = y + 30;
                    return {id, x, y, x1, y1, element, rotation}
                } else {
                    const element: Drawable = generator.rectangle(x, y, 30, 50, {
                        strokeWidth: 1,
                        fillStyle: 'solid',
                        fill: 'rgb(49,38,15)',
                        roughness: 0
                    });

                    x1 = x + 30;
                    y1 = y + 50;
                    return {id, x, y, x1, y1, element, rotation}
                }


            } else if (drawingElement === DrawingElement.WALL) {
                const element: Drawable = generator.line(x, y, x1, y1, {strokeWidth: 5});
                return {id, x, y, x1, y1, element}
            }
        }

        const updateElement = (id: number, x: number, y: number, clientX: number, clientY: number, type: DrawingElement, rotation?: number) => {
            if (rotation !== undefined && rotation >= 0) {
                const element = createElement(id, x, y, clientX, clientY, type, rotation);

                const bookshelfCopy = [...bookshelves];
                bookshelfCopy[id] = element as ElementType;

                setBookshelves(bookshelfCopy);
            }
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

            if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.DRAWING) {
                if (drawingBlock) {
                    setBookshelves((prevState) => [...prevState, ...blockSplitOnPieces]);
                    setCurrentDrawingBlock([]);
                }
            }
            // select bookshelf at cursor position
            if (action === ActionTypes.SELECTING) {
                const selectedElement = getElementAtPosition(clientX, clientY, bookshelves);
                if (selectedElement) {
                    setSelectedElement(selectedElement);
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

            if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.DRAWING) {
                if (drawingBlock) {
                    createElement(0, Math.round(clientX), Math.round(clientY), Math.round(clientX), Math.round(clientY), DrawingElement.BOOKSHELF, 0);
                }
            }
            if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.SELECTING) {
                if (getElementAtPosition(clientX, clientY, bookshelves)) {
                    event.target.style.cursor = "move";
                } else {
                    event.target.style.cursor = "default";
                }
            }

            if (selectedElement && action === ActionTypes.SELECTING) {
                setAction(ActionTypes.MOVING);
            } else if (selectedElement && action === ActionTypes.MOVING) {
                const {id, offsetY, offsetX, rotation} = selectedElement;

                updateElement(id, clientX, clientY, 0, 0, DrawingElement.BOOKSHELF, rotation)
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
                    setCurrentDrawingBlock([]);
                    if (drawingBlock) {
                        setDrawingBlock(false);
                    }
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
            setLeftDivOpen(false);
        }

        // select action and element we are editing
        const handleDrawingSelection = (drawingElement: DrawingElement) => {
            if (drawingElement === DrawingElement.WALL) {
                setAction(ActionTypes.NONE);
                setDrawingElement(drawingElement);
                setLeftDivOpen(false);
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

        const calculateCenterPoint = (item: ElementType | null) => {
            if (item) {
                let {x, y, x1, y1, element} = item;

                let width = Math.abs(x - x1);
                let height = Math.abs(y - y1);

                x = x + width / 2;
                y = y + height / 2;
                return {x, y};
            } else {
                return {x: 20, y: 20}
            }
        }

        const makeBlockPiece = (clientX: number, clientY: number) => {

            let bs_arr: ElementType[] = [];

            let bs_rotation = Number(bs_details.sh_rotation)
            if (bs_rotation === 0 || bs_rotation === 2) {
                for (let i = 0; i < bs_details.sh_length; i++) {
                    let x = (clientX + (i * 50));
                    let y = (clientY);
                    const element = generator.rectangle(x, y, 50, 30, {
                        strokeWidth: 1,
                        fillStyle: 'solid',
                        fill: 'rgb(49,38,15)',
                        roughness: 0
                    })
                    let x1 = x + 50;
                    let y1 = y + 30;
                    bs_arr.push({id: i, x, y, x1, y1, element, rotation: 0, nb_of_shelves: bs_details.sh_height, udk: []})
                }
            } else {
                for (let i = 0; i < bs_details.sh_length; i++) {
                    let x = (clientX);
                    let y = (clientY + (i * 50));
                    const element = generator.rectangle(x, y, 30, 50, {
                        strokeWidth: 1,
                        fillStyle: 'solid',
                        fill: 'rgb(49,38,15)',
                        roughness: 0
                    })
                    let x1 = x + 30;
                    let y1 = y + 50;
                    bs_arr.push({id: i, x, y, x1, y1, element, rotation: 90, nb_of_shelves: bs_details.sh_height, udk: []})
                }
            }

            // 1 big block

            let bigPiece: ElementType[] = [];

            let width = Math.abs(bs_arr[bs_arr.length - 1].x1 - bs_arr[0].x);
            let height = Math.abs(bs_arr[bs_arr.length - 1].y1 - bs_arr[0].y);

            let x = bs_arr[0].x;
            let y = bs_arr[0].y;

            const element = generator.rectangle(x, y, width, height, {
                strokeWidth: 1,
                fillStyle: 'solid',
                fill: 'rgb(49,38,15)',
                roughness: 0
            })
            let x1 = x + 50;
            let y1 = y + 30;
            bigPiece.push({id: bookshelves.length, x, y, x1, y1, element, rotation: 0})

            return [bs_arr, bigPiece];
        }

        const handleSubmit = (e: any) => {
            e.preventDefault();
            setDrawingBlock(true);
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const value = e.target.value;
            setBs_details({...bs_details, [name]: value});

        }

        const [radio, setRadio] = useState<number | null>(null);

        const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {

            setRadio(Number(e.target.value));
        }

        return (
            <>
                <div className="topDiv">
                    <div className={`topDiv-element${(radio===0) ? '--checked' : ''}`} onClick={handleElementSelection}>
                        <input id="radio-select" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="0"/>
                        <label htmlFor="radio-select">
                        <svg viewBox="0 0 320 512" className={`${(radio===0) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                            <path
                                d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"></path>
                        </svg>
                    </label>
                    </div>
                    <div className={`topDiv-element${(radio===1) ? '--checked' : ''}`} onClick={() => handleDrawingSelection(DrawingElement.WALL)}>
                        <input id="radio-drawLine" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="1"/>
                        <label htmlFor="radio-drawLine">
                        <svg viewBox="0 0 6 6" className={`${(radio===1) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                            <line x1="0" y1="3" x2="6" y2="3" stroke="currentColor" strokeLinecap="round"></line>
                        </svg>
                    </label>
                    </div>
                    <div className={`topDiv-element${(radio===2) ? '--checked' : ''}`} onClick={() => setLeftDivOpen(!leftDivOpen)}>
                        <input id="radio-drawRect" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="2"/>
                        <label htmlFor="radio-drawRect">
                        <svg viewBox="0 0 448 512" className={`${(radio===2) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                            <path
                                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>
                    </label>
                    </div>
                    <div className={`topDiv-element`} onClick={handleElementDelete}>
                        <input id="radio-delete" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="3"/>
                        <label htmlFor="radio-delete">
                            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                                 className={"topDiv-element-svgBlack"}>
                                <path fill="currentColor"
                                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                            </svg>
                        </label>
                    </div>
                </div>
                {leftDivOpen && (
                    <div className="leftDiv">
                        <form onSubmit={handleSubmit} className="form">
                            <div className="inputContainer">
                                <label htmlFor='ime'>Police v dolžino : </label>
                                <input name="sh_length" id="sh_rotation" type="number" min="1" value={bs_details.sh_length}
                                       onChange={handleChange}/>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor='ime'>Število polic v višino : </label>
                                <input name="sh_height" id="sh_height" type="number" min="1" value={bs_details.sh_height}
                                       onChange={handleChange}/>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor='ime'>Rotacija : </label>
                                <input name="sh_rotation" id="sh_rotation" type="range" min="0" max="3"
                                       value={bs_details.sh_rotation} step="1" onChange={handleChange}/>
                            </div>
                            <img className="image" src={sh_image} alt="Usmerjenost police"/>
                            <button onClick={() => handleDrawingSelection(DrawingElement.BOOKSHELF)}> Vstavi omaro</button>
                        </form>
                    </div>
                )}

                <canvas id="canvas" width={window.innerWidth}
                        height={window.innerHeight}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onDoubleClick={handleDoubleClick}
                        style={{backgroundColor: "lightgray"}}
                ></canvas>
            </>
        );
    }
;

export default Canvas;