import React, {ChangeEvent, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import rough from "roughjs/bin/rough";
import {RoughCanvas} from "roughjs/bin/canvas";
import {Drawable} from "roughjs/bin/core";
import '../styles/2d_canvas_page/Canvas.css';
import Modal from "./Modal";
import {CanvasSVG} from "../utils/canvas-getsvg";
import {WallContext} from "../context/wallElementsContext";

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

enum ElementStyleType {
    SelectedBookshelf = "SELECTED_BOOKSHELF",
    UdkSettled = "UDK_SETTLED",
    Normal = "NORMAL"
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
    udk?: Array<Array<string>>
};

type DataType = {
    sh_length: number,
    sh_height: number
    sh_rotation: number
}


const bs_initial_details = {
    sh_length: 0,
    sh_height: 0,
    sh_rotation: 1
}


const Canvas = () => {


        const [wallElements, setWallElements] = useState<Array<ElementType>>([]);
        const [bookshelves, setBookshelves] = useState<Array<ElementType>>([]);
        const [doorElements, setDoorElements] = useState<any>([]);

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


        const {walls, setWalls} = useContext(WallContext);

        useLayoutEffect(() => {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            let ctx = canvas!.getContext('2d');

            let canvasSVGContext = new CanvasSVG.Deferred();


            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            const roughCanvas: RoughCanvas = rough.canvas(canvas);

            bookshelves.map((item: ElementType, index: number) => item.id = index);

            [...doorElements].forEach(({text, x, y}) => {
                ctx!.font = '20px serif';
                ctx!.fillText(text, x, y);
            });

            if (walls) {
                for (let {start, end} of walls) {
                    ctx!.beginPath();
                    // Staring point (10,45)
                    ctx!.moveTo(start.x, start.y);
                    // End point (180,47)
                    ctx!.lineTo(end.x, end.y);
                    // Make the line visible
                    ctx!.stroke();
                }
            }

            [...bookshelves, ...currentDrawingBookshelf, ...wallElements, ...currentDrawingBlock].forEach(({element}: { element: Drawable }) => roughCanvas.draw(element))

            window.addEventListener('keyup', handleKeyPress, false);
            // @ts-ignore
            canvasSVGContext.wrapCanvas(canvas);
            return () => window.removeEventListener("keyup", handleKeyPress);

        }, [wallElements, bookshelves, currentDrawingBookshelf, currentDrawingBlock, doorElements, walls]);

        useEffect(() => {
            getImagePath(bs_details.sh_rotation);
        }, [bs_details.sh_rotation])

        const getImagePath = (rotation: number) => {
            switch (Number(rotation)) {
                case 0:
                    setSh_image("../../Shelf_rot_left.png")
                    break;
                case 1:
                    setSh_image("../../Shelf_rot_to.png")
                    break;
                case 2:
                    setSh_image("../../Shelf_rot_right.png")
                    break;
                case 3:
                    setSh_image("../../Shelf_rot_against.png")
                    break;
            }
        }

        const createElement = (id: number, x: number, y: number, x1: number, y1: number, type: DrawingElement, nb_of_shelves?: number, udk?: Array<Array<string>> | [], style?: ElementStyleType, rotation?: number) => {

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
                        // fill: 'rgb(49,38,15)',
                        fill: `${style === ElementStyleType.SelectedBookshelf ? 'rgb(78,102,166)' : 'rgb(49,38,15)'}`,
                        roughness: 0
                    });
                    x1 = x + 50;
                    y1 = y + 30;
                    return {id, x, y, x1, y1, element, nb_of_shelves, udk, rotation}
                } else {
                    const element: Drawable = generator.rectangle(x, y, 30, 50, {
                        strokeWidth: 1,
                        fillStyle: 'solid',
                        fill: `${style === ElementStyleType.SelectedBookshelf ? 'rgb(78,102,166)' : 'rgb(49,38,15)'}`,
                        roughness: 0
                    });

                    x1 = x + 30;
                    y1 = y + 50;
                    return {id, x, y, x1, y1, element, nb_of_shelves, udk, rotation}
                }
            } else if (drawingElement === DrawingElement.WALL) {
                const element: Drawable = generator.line(x, y, x1, y1, {strokeWidth: 5});
                return {id, x, y, x1, y1, element}
            }
        }

        const updateElement = (id: number, x: number, y: number, clientX: number, clientY: number, type: DrawingElement, nb_of_shelves: number | undefined, udk: Array<Array<string>> | undefined, style: ElementStyleType, rotation?: number | undefined) => {
            if (rotation !== undefined && rotation >= 0) {
                const element = createElement(id, x, y, clientX, clientY, type, nb_of_shelves, udk, style, rotation);
                const bookshelfCopy = [...bookshelves];
                bookshelfCopy[id] = element as ElementType;

                setBookshelves(bookshelfCopy);
            }
        }

        const nearPoint = (x: number, y: number, x1: number, y1: number, name: string) => {
            return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
        }

        const getElementAtPosition = (x: number, y: number, bookshelves: Array<ElementType>, type: DrawingElement) => {
            return bookshelves.find((bookshelf: ElementType) => isCursorOnElement(x, y, bookshelf, type));
        }

        const getWallAtPosition = (x: number, y: number, walls: Array<ElementType>, type: DrawingElement) => {

            let copy = wallElements.filter((item: any) => item.id !== 0);
            return copy?.map((element: any) => ({...element, position: isCursorOnElement(x, y, element, type)}))
                .find((element: any) => element.position !== null);
        }

        const distance = (a: any, b: any) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))


        const isCursorOnElement = (clientX: number, clientY: number, element: ElementType, type: DrawingElement) => {
            const {x, y, x1, y1}: { x: number, y: number, x1: number, y1: number } = element;

            if (type === DrawingElement.BOOKSHELF) {
                const minX = Math.min(x, x1);
                const maxX = Math.max(x, x1);
                const minY = Math.min(y, y1);
                const maxY = Math.max(y, y1);

                return clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY;
            }
            if (type === DrawingElement.WALL) {
                let a = {x: element.x, y: element.y};
                let b = {x: element.x1, y: element.y1};
                let c = {x: clientX, y: clientY};
                const offset = distance(a, b) - (distance(a, c) + distance(b, c));


                const start = nearPoint(clientX, clientY, element.x, element.y, "start");
                const inside = Math.abs(offset) < 1.5 ? "on" : null;
                return start || inside;
            }
        }

        // x,y -> točka,,, x1..y1 --> line segment
        function pDistance(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {

            let A = x - x1;
            let B = y - y1;
            let C = x2 - x1;
            let D = y2 - y1;

            let dot = A * C + B * D;
            let len_sq = C * C + D * D;
            let param = -1;
            if (len_sq != 0) //in case of 0 length line
                param = dot / len_sq;

            let xx, yy;

            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }

            let dx = x - xx;
            let dy = y - yy;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // A, B, P [AB -> line segment, P -> točka
        function getClosestPoint(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
            let a_to_p = [x - x1, y - y1];  // Storing vector A->P
            let a_to_b = [x2 - x1, y2 - y1];     // Storing vector A->B

            let atb2 = a_to_b[0] ** 2 + a_to_b[1] ** 2;  // **2 means "squared"
            //   Basically finding the squared magnitude
            //   of a_to_b

            let atp_dot_atb = a_to_p[0] * a_to_b[0] + a_to_p[1] * a_to_b[1];
            // The dot product of a_to_p and a_to_b

            let t = atp_dot_atb / atb2;  // The normalized "distance" from a to
            //   your closest point

            return {
                x: x1 + a_to_b[0] * t,
                y: y1 + a_to_b[1] * t
            };
            //  Add the distance to A, moving
            //    towards B
        }


        const calculateCoordinates = (clientX: number, clientY: number): { clientX: number, clientY: number } => {
            /*round to 10 nearest*/
            // Math.ceil(N / 10) * 10;

            /*round to 5 nearest*/
            clientX = (clientX % 5) >= 2.5 ? parseInt(String(clientX / 5)) * 5 + 5 : parseInt(String(clientX / 5)) * 5;
            clientY = (clientY % 5) >= 2.5 ? parseInt(String(clientY / 5)) * 5 + 5 : parseInt(String(clientY / 5)) * 5;

            return {clientX, clientY};
        }

        const [drawingDoor, setDrawingDoor] = useState(false);
        const [selectedWall, setSelectedWall] = useState<any>();


        const handleMouseDown = (event: any) => {
            const {
                clientX,
                clientY
            } = drawingElement === DrawingElement.BOOKSHELF ? calculateCoordinates(event.clientX, event.clientY) : event;

            if (drawingDoor) {
                const element = getWallAtPosition(clientX, clientY, bookshelves, DrawingElement.WALL);
                if (element) {
                    if (selectedWall) {
                        const {
                            x,
                            y
                        } = getClosestPoint(clientX, clientY, selectedWall.x, selectedWall.y, selectedWall.x1, selectedWall.y1);
                        if (Math.abs(element.x - element.x1) > Math.abs(element.y - element.y1))
                            setDoorElements((prevState: any) => [...prevState, {
                                text: "Vrata",
                                x: x + 5,
                                y: y + 20,
                                rotation: 0
                            }])
                        if (Math.abs(element.x - element.x1) < Math.abs(element.y - element.y1))
                            setDoorElements((prevState: any) => [...prevState, {
                                text: "Vrata",
                                x: x + 5,
                                y: y + 5,
                                rotation: 0
                            }])
                    } else {
                        // ni cursor blizu stene
                    }
                }
            }

            /*drawing walls*/
            if (drawingElement === DrawingElement.WALL && action === ActionTypes.NONE) {
                if (!isFirstCornerSelected) {

                    console.log(isFirstCornerSelected);
                    setWallEdgePressed(true);
                    const id = wallElements.length;
                    const element = createElement(id, clientX, clientY, clientX, clientY, DrawingElement.WALL);
                    setWallElements((prevState: any) => [...prevState, element]);
                    setIsFirstCornerSelected(true);
                }
                setAction(ActionTypes.DRAWING);
            } else if (drawingElement === DrawingElement.WALL && action === ActionTypes.DRAWING) {
                const elementAt = getWallAtPosition(clientX, clientY, wallElements, DrawingElement.WALL);
                if (elementAt) {
                    if (wallElements.length - elementAt.id > 1) {
                        setSelectedWall(elementAt);
                    } else {
                        setSelectedWall(null);
                    }
                }
            }

            if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.DRAWING) {
                if (drawingBlock) {
                    setBookshelves((prevState) => [...prevState, ...blockSplitOnPieces]);
                    setCurrentDrawingBlock([]);
                }
            }
            // select bookshelf at cursor position
            if (action === ActionTypes.SELECTING) {
                const selectedElement = getElementAtPosition(clientX, clientY, bookshelves, DrawingElement.BOOKSHELF);
                if (selectedElement) {
                    setSelectedElement(selectedElement);
                } else {
                    setSelectedElement(null);
                }
            }
        }

        const cursorStyle = (position: any) => {
            switch (position) {
                case "on":
                    return "move";
                default:
                    return "resize";
            }
        }

        const handleMouseMove = (event: any) => {
            const {
                clientX,
                clientY
            } = drawingElement === DrawingElement.BOOKSHELF ? calculateCoordinates(event.clientX, event.clientY) : event;

            if (drawingDoor) {
                const element = getWallAtPosition(clientX, clientY, wallElements, DrawingElement.WALL);

                // event.target.style.cursor = element
                //     ? cursorForPosition(element.position) : "default";

                if (element) {
                    setSelectedWall(element);
                }
            }

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
                    createElement(0, Math.round(clientX), Math.round(clientY), Math.round(clientX), Math.round(clientY), DrawingElement.BOOKSHELF, 0, [], ElementStyleType.Normal, 1);
                }
            }
            if (drawingElement === DrawingElement.BOOKSHELF && action === ActionTypes.SELECTING) {
                if (getElementAtPosition(clientX, clientY, bookshelves, DrawingElement.BOOKSHELF)) {
                    event.target.style.cursor = "move";
                } else {
                    event.target.style.cursor = "default";
                }
            }

            if (selectedElement && action === ActionTypes.SELECTING) {
                setAction(ActionTypes.MOVING);
            } else if (selectedElement && action === ActionTypes.MOVING) {
                const {id, offsetY, offsetX, rotation, nb_of_shelves, udk} = selectedElement;

                updateElement(id, clientX, clientY, 0, 0, DrawingElement.BOOKSHELF, nb_of_shelves, udk, ElementStyleType.SelectedBookshelf, rotation)
            }

        }


        const handleMouseUp = (event: any) => {

            const {
                clientX,
                clientY
            } = drawingElement === DrawingElement.BOOKSHELF ? calculateCoordinates(event.clientX, event.clientY) : event;

            if (action === ActionTypes.DRAWING && drawingElement === DrawingElement.WALL) {
                if (!isFirstCornerSelected) {
                    // TODO -> function for finding nearest point (wall edge)
                } else {
                    const index = wallElements.length - 1;
                    const wallPiece = wallElements[index];
                    // const elementAtPosition = getWallAtPosition(clientX, clientY, wallElements, DrawingElement.WALL);
                    let element;
                    /// cursor style crosshair
                    selectedWall?.position === "edge"
                        ? element = createElement(index, wallPiece.x1, wallPiece.y1, selectedWall.x, selectedWall.y, DrawingElement.WALL)
                        :
                        element = createElement(index, wallPiece.x1, wallPiece.y1, clientX, clientY, DrawingElement.WALL);

                    const wallElementsCopy = [...wallElements, element] as ElementType[];
                    setWallElements(wallElementsCopy);
                    setWallEdgePressed(false);
                }
            }

            if (selectedElement && action === ActionTypes.MOVING) {
                setAction(ActionTypes.NONE);
                const {nb_of_shelves, rotation, udk} = selectedElement;
                setSelectedElement(null);
                updateElement(selectedElement.id, clientX, clientY, 0, 0, DrawingElement.BOOKSHELF, nb_of_shelves, udk, ElementStyleType.Normal, rotation)
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
                setLeftDivOpen(true);
                setEdit(false);
            }

        }

        const handleDoubleClick = (event: any) => {
            const {clientX, clientY}: { clientX: number, clientY: number } = event;

            const selectedElement = getElementAtPosition(clientX, clientY, bookshelves, DrawingElement.BOOKSHELF);
            if (selectedElement && edit) {
                setSelectedElement(selectedElement);
                setLeftDivOpen(true);
            } else {
                setLeftDivOpen(false);
            }
        }

        // deleting bookshelves
        const handleElementDelete = () => {
            if (selectedElement && !edit) {
                const newState = bookshelves.filter((element: ElementType) => element.id !== selectedElement.id);
                setBookshelves(newState);
                setSelectedElement(null);
            }
        }

        const makeBlockPiece = (clientX: number, clientY: number) => {

            let bs_arr: ElementType[] = [];

            let bs_rotation = Number(bs_details.sh_rotation)
            if (bs_rotation === 1 || bs_rotation === 3) {
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
                    bs_arr.push({
                        id: i,
                        x,
                        y,
                        x1,
                        y1,
                        element,
                        rotation: (bs_rotation === 1) ? 0 : 180,
                        nb_of_shelves: bs_details.sh_height,
                        udk: []
                    })
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
                    bs_arr.push({
                        id: i,
                        x,
                        y,
                        x1,
                        y1,
                        element,
                        rotation: (bs_rotation === 0) ? 90 : 270,
                        nb_of_shelves: bs_details.sh_height,
                        udk: []
                    })
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
            if (action !== ActionTypes.DRAWING) {
                setAction(ActionTypes.DRAWING);
            }
        }

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const value = e.target.value;
            setBs_details({...bs_details, [name]: value});
        }

        const [edit, setEdit] = useState<boolean>(false);
        const [shelfUdk, setShelfUdk] = useState<udkEdit>({});
        const [radio, setRadio] = useState<number | null>(null);

        type udkEdit = {
            [shelfPosition: number]: string
        }

        const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {

            setRadio(Number(e.target.value));

        }

        const handleEditMode = () => {
            setEdit(true);
            setDrawingElement(DrawingElement.NONE);

        }

        const handleEditSubmit = (e: any) => {
            e.preventDefault()

            let udkArray: any = [];
            Object.values(shelfUdk).forEach((item: string) => {
                if (/,/g.test(item)) {
                    udkArray.push([item.split(', ')])
                } else {
                    udkArray?.push([item]);
                }
            });
            selectedElement!.udk = udkArray;
            setShelfUdk({});
        }

        const handleChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const value = e.target.value;
            setShelfUdk({...shelfUdk, [name]: value});
        }

        const getExistingShelfUdk = (selectedShelf: Array<string> | undefined) => {
            return (selectedShelf !== undefined) ? selectedShelf.join(", ") : ''
        }

        useEffect(() => {
            let obj: any = {};
            if (selectedElement && edit) {
                Array(Number(selectedElement.nb_of_shelves)).fill(null).forEach((item: null, index: number) => {
                    let udkArr: any = selectedElement?.udk;
                    let udkOnShelf = udkArr[index]?.join(' ')
                    Object.assign(obj, {[index]: udkOnShelf || ''});
                });
                setShelfUdk(obj);
                // setDrawingElement(DrawingElement.BOOKSHELF)
                // const {id, x, y, rotation, nb_of_shelves, udk } = selectedElement;
                // updateElement(id, x, y, 0,0, DrawingElement.BOOKSHELF, nb_of_shelves, udk, ElementStyleType.SelectedBookshelf, rotation);
            }
        }, [selectedElement]);

        /*SHRANJEVANJE KOORDINAT V JSON*/

        const getRoomCenter = (walls: any) => {

            let sumX = walls.reduce((acc: number, el: any) => acc + el.x1, 0);
            let sumY = walls.reduce((acc: number, el: any) => acc + el.y1, 0);

            return [sumX / walls.length - 1, sumY / walls.length - 1];
        }

        const calculateBookshelfCenterPoint = (item: ElementType | null) => {
            if (item) {
                let {id, x, y, x1, y1, rotation, udk, nb_of_shelves} = item;
                return {id, x: (x + x1) / 2, y: (y + y1) / 2, rotation, nb_of_shelves, udk};
            } else {
                return null;
            }
        }

        const initialPosition = {
            z: -7.39,
            y: 0.4,
            x: -6
        }
        const premik = 2.39;
        // x se vsakič poveča za 0.2
        // y se vsakič poveča za 0.64 (vertikalno)
        // če je z lihi je premik 0.5 (vztran od centra)


        const recalculateBookshelfCoordinates = (startingPointX: number, startingPointY: number) => {
            let bookShelfCoords: ElementType[] = [];
            bookshelves.forEach((item: ElementType) => {
                let {x, y, ...rest}: any = calculateBookshelfCenterPoint(item);
                bookShelfCoords.push({
                    x: Number(((x - startingPointX) / 10).toFixed(2)) / 2.5,
                    z: Number(((y - startingPointY) / 10).toFixed(2)) / 6, ...rest
                });
            });
            return bookShelfCoords;
        }

        const recalculateGroundCoordinates = (startingPointX: number, startingPointY: number) => {
            let ground: any = [];
            wallElements.forEach(({x1, y1}: ElementType) => {
                ground.push({
                    x: Number(((x1 - startingPointX) / 10).toFixed(2)) / 2.5,
                    z: Number(((y1 - startingPointY) / 10).toFixed(2)) / 3,
                    y: 0,
                });
            });
            return ground;
        }

        const recalculateEntrancesCoordinates = (startingPointX: number, startingPointY: number) => {
            let entrances: any = [];
            doorElements.forEach(({x, y}: ElementType) => {
                entrances.push({
                    x: Number(((x - startingPointX) / 10).toFixed(2)) / 2.5,
                    z: Number(((y - startingPointY) / 10).toFixed(2)) / 3,
                    y: 0
                });
            });
            return entrances;
        }

        const makeEntrancesData = (entrances: any) => {
            let entranceArr: any = [];

            entrances.forEach((item: any) => {
                entranceArr.push({
                    position: {x: item.x, z: item.z, y: item.y},
                    rotation: 0,
                })
            });
            return entranceArr;
        }

        const makeBookshelvesData = (recalcArrOfBookShelves: any) => {
            let bookshelves: any = [];

            recalcArrOfBookShelves.forEach((item: any) => Array(Number(item.nb_of_shelves)).fill(null).forEach((el: null, index: number, arr: any) => {
                bookshelves.push({
                    udks: item?.udk[arr.length - 1 - index] || [],
                    position: {x: item.x, z: item.z, y: (index * 0.64) + 0.4},
                    rotation: item.rotation
                })
            }));
            return bookshelves;
        }

        const makeOriginalBookshelvesData = () => {
            let original: any = [];
            bookshelves.forEach((item: any) => {
                console.log(item);
                original.push({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    x1: item.x1,
                    y1: item.y1,
                    udk: item.udk,
                    rotation: item.rotation,
                    nb_of_shelves: item.nb_of_shelves,
                })
            })
            return original;
        }

        const makeOriginalGroundData = (wallElements: any) => {
            let original: any = [];
            wallElements.forEach((item: any) => {
                original.push({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    x1: item.x1,
                    y1: item.y1,
                })
            })
            return original;
        }

        const makeOriginalEntrancesData = (entrances: any) => {
            let original: any = [];
            entrances.forEach((item: any) => {
                original.push({
                    x: item.x,
                    y: item.y,
                    rotation: item.rotation,
                })
            })
            return original;
        }

        const makeSvgCapture = (item: any) => {
            setWalls(item);
        }

        const saveToJson = (label: string, floor: number, canvas: any) => {
            const [startingPointX, startingPointY] = getRoomCenter(wallElements);


            // recalculated coords
            let bookshelves = makeBookshelvesData(recalculateBookshelfCoordinates(startingPointX, startingPointY));
            let ground = recalculateGroundCoordinates(startingPointX, startingPointY);
            let entrances = makeEntrancesData(recalculateEntrancesCoordinates(startingPointX, startingPointY));

            // original coords
            let bookshelvesOriginal = makeOriginalBookshelvesData();
            let groundOriginal = makeOriginalGroundData(wallElements);
            let entrancesOriginal = makeOriginalEntrancesData(doorElements);


            let JSON_FORMAT_ORIGINAL = [];
            JSON_FORMAT_ORIGINAL.push({
                label,
                floor,
                ground: groundOriginal,
                entrances: entrancesOriginal,
                bookshelves: bookshelvesOriginal,
            });

            let JSON_FORMAT = [];
            JSON_FORMAT.push({
                label,
                floor,
                ground,
                entrances,
                bookshelves
            });


            setWallElements([]);
            console.log(walls)

            let context = canvas!.getContext('2d');
            let res = context!.getSVG();
            console.log(res);

            /*TODO*/
            // svg se more shranit na bazo

            console.log("TO KAJ JE PRERAČUNANO", JSON.stringify(JSON_FORMAT));
            console.log("ORIGINAL", JSON.stringify(JSON_FORMAT_ORIGINAL))

            return [JSON.stringify(JSON_FORMAT), JSON.stringify(JSON_FORMAT_ORIGINAL)];
        }

        /*SHRANJEVANJE KOORDINAT V JSON*/

        const addDoors = () => {
            setDrawingDoor(!drawingDoor);
            setDrawingElement(DrawingElement.NONE);
        }

        const [isOpen, setIsOpen] = useState<boolean>(false);

        useEffect(() => {
            makeSvgCapture(wallElements);
        }, [isOpen]);

        const onClose = () => setIsOpen(false);


        return (
            <>
                <Modal open={isOpen} onClose={onClose} saveToJson={saveToJson}/>
                <div className="topDiv">
                    <div className={`topDiv-element${(radio === 0) ? '--checked' : ''}`} onClick={handleElementSelection}>
                        <input id="radio-select" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="0"/>
                        <label htmlFor="radio-select">
                            <svg viewBox="0 0 320 512"
                                 className={`${(radio === 0) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                                <path
                                    d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"></path>
                            </svg>
                        </label>
                    </div>
                    <div className={`topDiv-element${(radio === 1) ? '--checked' : ''}`}
                         onClick={() => handleDrawingSelection(DrawingElement.WALL)}>
                        <input id="radio-drawLine" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="1"/>
                        <label htmlFor="radio-drawLine">
                            <svg viewBox="0 0 6 6"
                                 className={`${(radio === 1) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                                <line x1="0" y1="3" x2="6" y2="3" stroke="currentColor" strokeLinecap="round"></line>
                            </svg>
                        </label>
                    </div>
                    <div className={`topDiv-element${(radio === 2) ? '--checked' : ''}`}
                         onClick={() => handleDrawingSelection(DrawingElement.BOOKSHELF)}>
                        <input id="radio-drawRect" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="2"/>
                        <label htmlFor="radio-drawRect">
                            <svg viewBox="0 0 448 512"
                                 className={`${(radio === 2) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                                <path
                                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                        </label>
                    </div>
                    <div className={`topDiv-element${(radio === 4) ? '--checked' : ''}`} onClick={handleEditMode}>
                        <input id="radio-edit" type="radio" name="action-selection" className="topDiv-elementRadio"
                               onChange={handleRadioChange} value="4"/>
                        <label htmlFor="radio-edit">
                            <svg viewBox="0 0 512 512"
                                 className={`${(radio === 4) ? 'topDiv-element-svgWhite' : 'topDiv-element-svgBlack'}`}>
                                <path fill="currentColor"
                                      d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
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
                    <div className={`topDiv-element`}>
                        <button onClick={addDoors}>Vstavi vrata</button>
                    </div>
                    <div className={`topDiv-element`}>
                        {/*<button onClick={saveToJson}>Shrani v json</button>*/}
                        <button onClick={() => setIsOpen(true)}>Shrani v json</button>
                    </div>
                </div>
                {/*EDITING AND DRAWING SHELVES*/}
                {leftDivOpen && (
                    <div className="leftDiv">
                        {edit && selectedElement !== null ? (
                            <form onSubmit={handleEditSubmit} className="form">
                                <h2>Določanje udk</h2>
                                {Array(Number(selectedElement.nb_of_shelves)).fill(null).map((item: null, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="inputContainer">
                                                <label htmlFor='udk'>Udk {index}: </label>
                                                <input name={index.toString()} id="udk" type="text"
                                                       value={shelfUdk[index]}
                                                       onChange={handleChangeEdit}/>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                                <button type="submit">Shrani udk</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="form">
                                <div className="inputContainer">
                                    <label htmlFor='sh_rotation'>Police v dolžino : </label>
                                    <input name="sh_length" id="sh_rotation" type="number" min="1"
                                           value={bs_details.sh_length}
                                           onChange={handleChange}/>
                                </div>
                                <div className="inputContainer">
                                    <label htmlFor='sh_height'>Število polic v višino : </label>
                                    <input name="sh_height" id="sh_height" type="number" min="1"
                                           value={bs_details.sh_height}
                                           onChange={handleChange}/>
                                </div>
                                <div className="inputContainer">
                                    <label htmlFor='sh_rotation'>Rotacija : </label>
                                    <input name="sh_rotation" id="sh_rotation" type="range" min="0" max="3"
                                           value={bs_details.sh_rotation} step="1" onChange={handleChange}/>
                                </div>
                                <img className="image" src={sh_image} alt="Usmerjenost police"/>
                                <button type="submit"> Vstavi omaro</button>
                            </form>
                        )}
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