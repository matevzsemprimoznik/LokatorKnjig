import React, {ChangeEvent, useContext, useEffect, useLayoutEffect, useState,} from "react";
import rough from "roughjs/bin/rough";
import {RoughCanvas} from "roughjs/bin/canvas";
import {Drawable} from "roughjs/bin/core";
import "../styles/2d_canvas_page/Canvas.css";
import Modal from "./Modal";
import {CanvasSVG} from "../utils/canvas-getsvg";
import {WallContext} from "../context/wallElementsContext";
import {useParams} from "react-router-dom";
import {
    ActionTypes,
    DrawingElement,
    ElementStyleType,
    ElementType,
    udkEdit,
    WallType
} from "../models/canvas_models/canvas";
import {
    adjustElementCoordinates,
    calculateCoordinates,
    cursorStyle,
    distance,
    getClosestPoint,
    nearPoint,
    resizedCoordinates,
} from "../utils/canvas_utils/canvas_math_functions/canvas_math";
import {
    addSpace,
    calculateBookshelfCenterPoint,
    getRoomCenter,
    makeBookshelvesData,
    makeEntrancesData,
} from "../utils/canvas_utils/canvas_to_json_funcions/canvas_to_json";
import {Cache} from "three";
import add = Cache.add;

export const generator = rough.generator();


export const bs_initial_details = {
    sh_length: 0,
    sh_height: 0,
    sh_rotation: 1,
};

const Canvas = () => {


    const {
        wallElements,
        setWallElements,
        bookshelves,
        setBookshelves,
        doorElements,
        setDoorElements,
        bs_details,
        setBs_details
    } = useContext(WallContext);

    const [nekaj, setNekaj] = useState<any>();

    const [currentDrawingBookshelf, setCurrentDrawingBookshelf] = useState<Array<ElementType>>([]);
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(
        null
    );
    const [roomBoundaries, setRoomBoundaries] = useState<any>([]);

    const [action, setAction] = useState<ActionTypes>(ActionTypes.NONE);

    const [drawingElement, setDrawingElement] = useState<DrawingElement>(
        DrawingElement.NONE
    );

    const [selectedRoomBoundary, setSelectedRoomBoundary] = useState<any>(null);

    //vrata
    const [drawingDoor, setDrawingDoor] = useState(false);
    const [selectedWall, setSelectedWall] = useState<any>();
    // vrata


    const [leftDivOpen, setLeftDivOpen] = useState<boolean>(false);
    const [drawingBlock, setDrawingBlock] = useState<boolean>(false);

    const [sh_image, setSh_image] = useState<string>("../../Shelf_rot_to.png");
    const [currentDrawingBlock, setCurrentDrawingBlock] = useState<Array<ElementType>>([]);

    const [blockSplitOnPieces, setBlockSplitOnPieces] = useState<Array<ElementType>>([]);

    const {abbr} = useParams();

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let ctx = canvas!.getContext("2d");

        let canvasSVGContext = new CanvasSVG.Deferred();

        ctx!.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas: RoughCanvas = rough.canvas(canvas);

        bookshelves.map((item: ElementType, index: number) => (item.id = index));

        [...doorElements].forEach(({text, x, y}) => {
            let startAngle = (1 * Math.PI) / 2;
            let endAngle = startAngle + Math.PI / 2;
            ctx!.beginPath();
            ctx!.moveTo(x, y);
            ctx!.arc(x, y, 50, startAngle, endAngle);
            ctx!.closePath();
            ctx!.stroke();
        });

        [...wallElements].forEach((item: any) => {
            ctx!.beginPath();
            ctx!.moveTo(item.x, item.y);
            ctx!.lineTo(item.x1, item.y1);
            ctx!.stroke();
        });

        [...roomBoundaries].forEach((item: any) => {
            ctx!.beginPath();
            ctx!.strokeRect(item.x, item.y, (item.x1 - item.x), (item.y1 - item.y));
        });

        [
            ...bookshelves,
            ...currentDrawingBookshelf,
            ...currentDrawingBlock,
        ].forEach(({element}: { element: Drawable }) =>
            roughCanvas.draw(element)
        );

        window.addEventListener("keyup", handleKeyPress, false);
        // @ts-ignore
        canvasSVGContext.wrapCanvas(canvas);
        return () => window.removeEventListener("keyup", handleKeyPress);
    }, [
        wallElements,
        bookshelves,
        currentDrawingBookshelf,
        currentDrawingBlock,
        doorElements,
        roomBoundaries
    ]);

    useEffect(() => {
        getImagePath(bs_details.sh_rotation);
    }, [bs_details.sh_rotation]);

    const getImagePath = (rotation: number) => {
        switch (Number(rotation)) {
            case 0:
                setSh_image("../../Shelf_rot_left.png");
                break;
            case 1:
                setSh_image("../../Shelf_rot_to.png");
                break;
            case 2:
                setSh_image("../../Shelf_rot_right.png");
                break;
            case 3:
                setSh_image("../../Shelf_rot_against.png");
                break;
        }
    };


    useEffect(() => {
        let id = 0;
        if (roomBoundaries.length >= 1) {
            const {x, y, x1, y1} = roomBoundaries[0];
            let leftWallElement = {id: id++, x, y, x1: x, y1}
            let bottomWallElement = {id: id++, x, y: y1, x1, y1}
            let rightWallElement = {id: id++, x: x1, y: y1, x1, y1: y}
            let topWallElement = {id: id++, x: x1, y: y, x1: x, y1: y}
            setWallElements([leftWallElement, bottomWallElement, rightWallElement, topWallElement]);
        }
    }, [roomBoundaries]);


    const createElement = (
        id: number,
        x: number,
        y: number,
        x1: number,
        y1: number,
        type: DrawingElement,
        nb_of_shelves?: number,
        udk?: Array<Array<string>> | [],
        style?: ElementStyleType,
        rotation?: number
    ) => {
        if (drawingElement === DrawingElement.BOOKSHELF) {
            if (drawingBlock) {
                let [blockSplit, block] = makeBlockPiece(x, y);
                setCurrentDrawingBlock(block);
                setBlockSplitOnPieces(blockSplit);
            }

            if (rotation === 0 || rotation === 180) {
                const element: Drawable = generator.rectangle(x, y, 50, 30, {
                    strokeWidth: 1,
                    fillStyle: "solid",
                    // fill: 'rgb(49,38,15)',
                    fill: `${
                        style === ElementStyleType.SelectedBookshelf
                            ? "rgb(78,102,166)"
                            : "rgba(49,38,15,0.8)"
                    }`,
                    roughness: 0,
                });
                x1 = x + 50;
                y1 = y + 30;
                return {id, x, y, x1, y1, element, nb_of_shelves, udk, rotation};
            } else {
                const element: Drawable = generator.rectangle(x, y, 30, 50, {
                    strokeWidth: 1,
                    fillStyle: "solid",
                    fill: `${
                        style === ElementStyleType.SelectedBookshelf
                            ? "rgb(78,102,166)"
                            : "rgba(49,38,15,0.8)"
                    }`,
                    roughness: 0,
                });

                x1 = x + 30;
                y1 = y + 50;
                return {id, x, y, x1, y1, element, nb_of_shelves, udk, rotation};
            }
        } else if (drawingElement === DrawingElement.WALL) {
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            let canvasContextRef = canvas!.getContext("2d");
            let ctx = canvasContextRef;

            ctx!.beginPath();
            ctx!.strokeRect(x, y, x1 - x, y1 - y);

            return {id, x, y, x1, y1};
        }
    };

    const updateElement = (
        id: number,
        x: number,
        y: number,
        clientX: number,
        clientY: number,
        type: DrawingElement,
        nb_of_shelves?: number,
        udk?: Array<Array<string>>,
        style?: ElementStyleType,
        rotation?: number | undefined
    ) => {
        if (rotation !== undefined && rotation >= 0) {
            const element = createElement(
                id,
                x,
                y,
                clientX,
                clientY,
                type,
                nb_of_shelves,
                udk,
                style,
                rotation
            );
            const bookshelfCopy = [...bookshelves];
            bookshelfCopy[id] = element as ElementType;

            setBookshelves(bookshelfCopy);
        }
        if (type === DrawingElement.WALL) {
            const updatedWallBoundaries = createElement(id, x, y, clientX, clientY, DrawingElement.WALL);

            const elCopy = JSON.parse(JSON.stringify(roomBoundaries));
            elCopy[0] = updatedWallBoundaries;
            setRoomBoundaries(elCopy);
        }
    };

    const getElementAtPosition = (
        x: number,
        y: number,
        bookshelves: Array<ElementType>,
        type: DrawingElement
    ) => {
        return bookshelves.find((bookshelf: ElementType) =>
            isCursorOnElement(x, y, bookshelf, type)
        );
    };

    const getWallPieceAtPosition = (x: number,
                                    y: number,
                                    walls: Array<WallType>,
                                    type: DrawingElement) => {
        return walls.find((wall: any) =>
            isCursorOnElement(x, y, wall, type)
        );
    }

    const getWallAtPosition = (
        x: number,
        y: number,
        walls: Array<WallType>,
        type: DrawingElement
    ) => {
        return roomBoundaries
            ?.map((element: any) => ({
                ...element,
                position: isCursorOnElement(x, y, element, type),
            }))
            .find((element: any) => element.position !== null);
    };

    const isCursorOnElement = (
        clientX: number,
        clientY: number,
        element: any,
        type: DrawingElement
    ) => {
        const {x, y, x1, y1}: { x: number; y: number; x1: number; y1: number } =
            element;

        if (type === DrawingElement.DOOR) {
            let a = {x: element.x, y: element.y};
            let b = {x: element.x1, y: element.y1};
            let c = {x: clientX, y: clientY};
            const offset = distance(a, b) - (distance(a, c) + distance(b, c));

            return Math.abs(offset) < 1.5;
        }

        if (type === DrawingElement.BOOKSHELF) {
            const minX = Math.min(x, x1);
            const maxX = Math.max(x, x1);
            const minY = Math.min(y, y1);
            const maxY = Math.max(y, y1);

            return (
                clientX >= minX && clientX <= maxX && clientY >= minY && clientY <= maxY
            );
        }
        if (type === DrawingElement.WALL) {
            const {id, x, y, x1, y1} = element;
            const topLeft = nearPoint(clientX, clientY, x, y, "tl");
            const topRight = nearPoint(clientX, clientY, x1, y, "tr");
            const bottomLeft = nearPoint(clientX, clientY, x, y1, "bl");
            const bottomRight = nearPoint(clientX, clientY, x1, y1, "br");

            const inside = clientX >= x && clientX <= x1 && clientY >= y && clientY <= y1 ? "inside" : null
            return topLeft || topRight || bottomLeft || bottomRight || inside
        }
    };

    const handleMouseDown = (event: any) => {
        const {clientX, clientY} =
            drawingElement === DrawingElement.BOOKSHELF
                ? calculateCoordinates(event.clientX, event.clientY)
                : event;

        /* VRATA */

        if (drawingDoor) {
            const element = getWallPieceAtPosition(
                clientX,
                clientY,
                wallElements,
                DrawingElement.DOOR
            );
            console.log("ko pritisnem je to stranica za vrata", element);
            console.log(" selected wall ko pritisnem", selectedWall)
            if (element) {
                if (nekaj) {
                    const {x, y} = getClosestPoint(
                        clientX,
                        clientY,
                        nekaj.x,
                        nekaj.y,
                        nekaj.x1,
                        nekaj.y1
                    );
                    console.log(x, y);
                    if (
                        Math.abs(element.x - element.x1) > Math.abs(element.y - element.y1)
                    )
                        setDoorElements((prevState: any) => [
                            ...prevState,
                            {
                                text: "Vrata",
                                x: x,
                                y: y,
                                rotation: 0,
                            },
                        ]);
                    if (
                        Math.abs(element.x - element.x1) < Math.abs(element.y - element.y1)
                    )
                        setDoorElements((prevState: any) => [
                            ...prevState,
                            {
                                text: "Vrata",
                                x,
                                y,
                                rotation: 0,
                            },
                        ]);
                } else {
                    console.log("ni blizu stene")
                    // ni cursor blizu stene
                }
            }
        }

        /* VRATA */

        /*drawing walls*/
        if (drawingElement === DrawingElement.WALL && action === ActionTypes.NONE) {
            const element = createElement(1, clientX, clientY, clientX, clientY, DrawingElement.WALL);
            setRoomBoundaries((prevState: any) => [...prevState, element]);
            setAction(ActionTypes.DRAWING)
        }


        if (
            drawingElement === DrawingElement.BOOKSHELF &&
            action === ActionTypes.DRAWING
        ) {
            if (drawingBlock) {
                setBookshelves((prevState) => [...prevState, ...blockSplitOnPieces]);
                setCurrentDrawingBlock([]);
            }
        }
        // select bookshelf at cursor position
        if (action === ActionTypes.SELECTING) {
            let wallAtPos = getWallAtPosition(clientX,
                clientY,
                roomBoundaries,
                DrawingElement.WALL);
            let bShelfAtPos = getElementAtPosition(clientX,
                clientY,
                bookshelves,
                DrawingElement.BOOKSHELF);

            if (bShelfAtPos) {
                setDrawingElement(DrawingElement.BOOKSHELF);
                setSelectedElement(bShelfAtPos);
            } else {
                setSelectedElement(null);
            }
            if (bShelfAtPos && wallAtPos) {
                setDrawingElement(DrawingElement.BOOKSHELF);
            } else if (wallAtPos) {
                const offsetX = clientX - wallAtPos.x;
                const offsetY = clientY - wallAtPos.y;

                setSelectedElement(null);
                setDrawingElement(DrawingElement.WALL);
                setSelectedRoomBoundary({...wallAtPos, offsetX, offsetY});

                if (wallAtPos.position === "inside") {
                    setAction(ActionTypes.MOVING)
                } else {
                    setAction(ActionTypes.RESIZING)
                }
            }
        }
    };


    const handleMouseMove = (event: any) => {
        const {clientX, clientY} =
            drawingElement === DrawingElement.BOOKSHELF
                ? calculateCoordinates(event.clientX, event.clientY)
                : event;

        /* VRATA */
        if (drawingDoor) {
            const element = getWallPieceAtPosition(
                clientX,
                clientY,
                wallElements,
                DrawingElement.DOOR
            );
            // console.log("element stene ko premikamo", element)

            // event.target.style.cursor = element
            //     ? cursorStyle(element.position)
            //     : "default";

            if (element) {
                // setSelectedWall(element);
                setNekaj(element);
            } else {
                // setSelectedWall([]);
                setNekaj([]);
            }
        }

        /* vrata */

        if (
            drawingElement === DrawingElement.WALL &&
            action === ActionTypes.DRAWING
        ) {
            const index = roomBoundaries.length - 1;
            const {x, y} = roomBoundaries[index];
            const element = createElement(
                index,
                x,
                y,
                clientX,
                clientY,
                DrawingElement.WALL
            );

            const wallElementsCopy = [...roomBoundaries];
            wallElementsCopy[index] = element as ElementType;
            setRoomBoundaries(wallElementsCopy);
        }

        if (
            drawingElement === DrawingElement.BOOKSHELF &&
            action === ActionTypes.DRAWING
        ) {
            if (drawingBlock) {
                createElement(
                    0,
                    Math.round(clientX),
                    Math.round(clientY),
                    Math.round(clientX),
                    Math.round(clientY),
                    DrawingElement.BOOKSHELF,
                    0,
                    [],
                    ElementStyleType.Normal,
                    1
                );
            }
        }

        /*določam, kaj delamo*/
        if (action === ActionTypes.SELECTING/* && drawingElement === DrawingElement.NONE*/) {
            let wallAtPos = getWallAtPosition(clientX,
                clientY,
                roomBoundaries,
                DrawingElement.WALL);
            console.log(wallAtPos)
            event.target.style.cursor = wallAtPos ? cursorStyle(wallAtPos.position) : "default";
            let bShelfAtPos = getElementAtPosition(clientX,
                clientY,
                bookshelves,
                DrawingElement.BOOKSHELF);

            if (bShelfAtPos) {
                setDrawingElement(DrawingElement.BOOKSHELF);
            }
            if (bShelfAtPos && wallAtPos) {
                setDrawingElement(DrawingElement.BOOKSHELF);
            } else if (wallAtPos) {
                setDrawingElement(DrawingElement.WALL);
            }

        }
        /**/

        if (
            drawingElement === DrawingElement.BOOKSHELF &&
            action === ActionTypes.SELECTING
        ) {
            if (
                getElementAtPosition(
                    clientX,
                    clientY,
                    bookshelves,
                    DrawingElement.BOOKSHELF
                )
            ) {
                event.target.style.cursor = "move";
            } else {
                event.target.style.cursor = "default";
            }
        }

        if (selectedElement && action === ActionTypes.SELECTING) {
            setAction(ActionTypes.MOVING);
        } else if (selectedElement && action === ActionTypes.MOVING) {
            const {id, offsetY, offsetX, rotation, nb_of_shelves, udk} =
                selectedElement;

            updateElement(
                id,
                clientX,
                clientY,
                0,
                0,
                DrawingElement.BOOKSHELF,
                nb_of_shelves,
                udk,
                ElementStyleType.SelectedBookshelf,
                rotation
            );
        }

        if (selectedRoomBoundary && action === ActionTypes.SELECTING) {
            setAction(ActionTypes.MOVING);
        } else if (selectedRoomBoundary && action === ActionTypes.MOVING) {
            const {id, x, y, x1, y1, offsetX, offsetY} = selectedRoomBoundary;
            let width = x1 - x;
            let height = y1 - y;

            const newX = clientX - offsetX;
            const newY = clientY - offsetY;
            updateElement(id, newX, newY, newX + width, newY + height, DrawingElement.WALL)
        } else if (selectedRoomBoundary && action === ActionTypes.RESIZING) {
            const {id, position, ...existingCoordinates} = selectedRoomBoundary;
            // @ts-ignore
            const {x, y, x1, y1} = resizedCoordinates(clientX, clientY, position, existingCoordinates);
            updateElement(id, x, y, x1, y1, DrawingElement.WALL);

        }
    };

    const handleMouseUp = (event: any) => {
        const {clientX, clientY} =
            drawingElement === DrawingElement.BOOKSHELF
                ? calculateCoordinates(event.clientX, event.clientY)
                : event;

        if (
            action === ActionTypes.DRAWING &&
            drawingElement === DrawingElement.WALL || action === ActionTypes.RESIZING && drawingElement === DrawingElement.WALL
        ) {
            const id = roomBoundaries[0].id;
            const {x, y, x1, y1} = adjustElementCoordinates(roomBoundaries[0]);
            updateElement(id, x, y, x1, y1, DrawingElement.WALL);
            setAction(ActionTypes.NONE);
            setSelectedWall(null);
        }

        if (selectedElement && action === ActionTypes.MOVING) {
            setAction(ActionTypes.NONE);
            const {nb_of_shelves, rotation, udk} = selectedElement;
            setSelectedElement(null);
            updateElement(
                selectedElement.id,
                clientX,
                clientY,
                0,
                0,
                DrawingElement.BOOKSHELF,
                nb_of_shelves,
                udk,
                ElementStyleType.Normal,
                rotation
            );
            event.target.style.cursor = "default";
        }
        if (selectedRoomBoundary && action === ActionTypes.MOVING) {
            setAction(ActionTypes.NONE);
            setSelectedRoomBoundary(null);
        }
        if (action === ActionTypes.RESIZING) {
            setAction(ActionTypes.NONE);
            setDrawingElement(DrawingElement.NONE);
            setSelectedRoomBoundary(null);
        }
        event.target.style.cursor = "default";

        if (drawingElement === DrawingElement.DOOR && nekaj) {
            console.log("moglo bi se narisat");
            setAction(ActionTypes.NONE);
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Escape") {
            if (
                action === ActionTypes.DRAWING &&
                drawingElement === DrawingElement.BOOKSHELF
            ) {
                setCurrentDrawingBookshelf([]);
                setCurrentDrawingBlock([]);
                if (drawingBlock) {
                    setDrawingBlock(false);
                }
            }
            setAction(ActionTypes.NONE);
        }
    };

    const makeBlockPiece = (clientX: number, clientY: number) => {
        let bs_arr: ElementType[] = [];

        let bs_rotation = Number(bs_details.sh_rotation);
        if (bs_rotation === 1 || bs_rotation === 3) {
            for (let i = 0; i < bs_details.sh_length; i++) {
                let x = clientX + i * 50;
                let y = clientY;
                const element = generator.rectangle(x, y, 50, 30, {
                    strokeWidth: 1,
                    fillStyle: "solid",
                    fill: "rgb(49,38,15)",
                    roughness: 0,
                });
                let x1 = x + 50;
                let y1 = y + 30;
                bs_arr.push({
                    id: i,
                    x,
                    y,
                    x1,
                    y1,
                    element,
                    rotation: bs_rotation === 1 ? 0 : 180,
                    nb_of_shelves: bs_details.sh_height,
                    udk: [],
                });
            }
        } else {
            for (let i = 0; i < bs_details.sh_length; i++) {
                let x = clientX;
                let y = clientY + i * 50;
                const element = generator.rectangle(x, y, 30, 50, {
                    strokeWidth: 1,
                    fillStyle: "solid",
                    fill: "rgb(49,38,15)",
                    roughness: 0,
                });
                let x1 = x + 30;
                let y1 = y + 50;
                bs_arr.push({
                    id: i,
                    x,
                    y,
                    x1,
                    y1,
                    element,
                    rotation: bs_rotation === 0 ? 90 : 270,
                    nb_of_shelves: bs_details.sh_height,
                    udk: [],
                });
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
            fillStyle: "solid",
            fill: "rgb(49,38,15)",
            roughness: 0,
        });
        let x1 = x + 50;
        let y1 = y + 30;
        bigPiece.push({
            id: bookshelves.length,
            x,
            y,
            x1,
            y1,
            element,
            rotation: 0,
        });

        return [bs_arr, bigPiece];
    };


    // element selecting action
    const handleElementSelection = () => {

        setDrawingElement(DrawingElement.NONE);

        setAction(ActionTypes.SELECTING);
        setSelectedElement(null);
        setLeftDivOpen(false);
    };

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
    };

    const handleDoubleClick = (event: any) => {
        const {clientX, clientY}: { clientX: number; clientY: number } = event;

        const selectedElement = getElementAtPosition(
            clientX,
            clientY,
            bookshelves,
            DrawingElement.BOOKSHELF
        );
        if (selectedElement && edit) {
            setSelectedElement(selectedElement);
            setLeftDivOpen(true);
        } else {
            setLeftDivOpen(false);
        }
    };

    // deleting bookshelves
    const handleElementDelete = () => {
        if (selectedElement && !edit) {
            const newState = bookshelves.filter(
                (element: ElementType) => element.id !== selectedElement.id
            );
            setBookshelves(newState);
            setSelectedElement(null);
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setDrawingBlock(true);
        if (action !== ActionTypes.DRAWING) {
            setAction(ActionTypes.DRAWING);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setBs_details({...bs_details, [name]: value});
    };

    const [edit, setEdit] = useState<boolean>(false);
    const [shelfUdk, setShelfUdk] = useState<udkEdit>({});
    const [radio, setRadio] = useState<number | null>(null);


    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRadio(Number(e.target.value));
    };

    const handleEditMode = () => {
        setEdit(true);
        setDrawingElement(DrawingElement.NONE);
    };

    const handleEditSubmit = (e: any) => {
        e.preventDefault();

        let udkArray: any = [];
        Object.values(shelfUdk).forEach((item: string) => {
            if (/,/g.test(item)) {
                udkArray.push([item.split(", ")]);
            } else {
                udkArray?.push([item]);
            }
        });
        selectedElement!.udk = udkArray;
        setShelfUdk({});
    };

    const handleChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setShelfUdk({...shelfUdk, [name]: value});
    };

    const getExistingShelfUdk = (selectedShelf: Array<string> | undefined) => {
        return selectedShelf !== undefined ? selectedShelf.join(", ") : "";
    };

    useEffect(() => {
        let obj: any = {};
        if (selectedElement && edit) {
            Array(Number(selectedElement.nb_of_shelves))
                .fill(null)
                .forEach((item: null, index: number) => {
                    let udkArr: any = selectedElement?.udk;
                    let udkOnShelf = udkArr[index]?.join(" ");
                    Object.assign(obj, {[index]: udkOnShelf || ""});
                });
            setShelfUdk(obj);
            // setDrawingElement(DrawingElement.BOOKSHELF)
            // const {id, x, y, rotation, nb_of_shelves, udk } = selectedElement;
            // updateElement(id, x, y, 0,0, DrawingElement.BOOKSHELF, nb_of_shelves, udk, ElementStyleType.SelectedBookshelf, rotation);
        }
    }, [selectedElement]);

    const recalculateBookshelfCoordinates = (
        startingPointX: number,
        startingPointY: number
    ) => {
        let bookShelfCoords: ElementType[] = [];
        bookshelves.forEach((item: ElementType) => {
            let {x, y, ...rest}: any = calculateBookshelfCenterPoint(item);
            bookShelfCoords.push({
                x: Number(((x - startingPointX) / 10).toFixed(2)) / 2.5,
                z: Number(((y - startingPointY) / 10).toFixed(2)) / 6,
                ...rest,
            });
        });
        return bookShelfCoords;
    };

    const recalculateGroundCoordinates = (
        startingPointX: number,
        startingPointY: number
    ) => {
        let ground: any = [];
        wallElements.forEach(({x1, y1}: WallType) => {
            ground.push({
                x: Number(((x1 - startingPointX) / 10).toFixed(2)) / 2.5,
                z: Number(((y1 - startingPointY) / 10).toFixed(2)) / 3,
                y: 0,
            });
        });
        return ground;
    };

    const recalculateEntrancesCoordinates = (
        startingPointX: number,
        startingPointY: number
    ) => {
        let entrances: any = [];
        doorElements.forEach(({x, y}: ElementType) => {
            entrances.push({
                x: Number(((x - startingPointX) / 10).toFixed(2)) / 2.5,
                z: Number(((y - startingPointY) / 10).toFixed(2)) / 3,
                y: 0,
            });
        });
        return entrances;
    };


    const makeOriginalBookshelvesData = () => {
        let original: any = [];
        bookshelves.forEach((item: any) => {
            original.push({
                id: item.id,
                x: item.x,
                y: item.y,
                x1: item.x1,
                y1: item.y1,
                udk: item.udk,
                rotation: item.rotation,
                nb_of_shelves: item.nb_of_shelves,
            });
        });
        return original;
    };


    const maxMinWallElements = () => {
        const sortedXelements = JSON.parse(JSON.stringify(wallElements)).sort(
            (a: ElementType, b: ElementType) => a.x - b.x
        );
        const sortedYelements = JSON.parse(JSON.stringify(wallElements)).sort(
            (a: ElementType, b: ElementType) => a.y - b.y
        );

        return [
            sortedXelements[0].x,
            sortedYelements[0].y,
            sortedXelements[sortedXelements.length - 1].x,
            sortedYelements[sortedYelements.length - 1].y,
        ];
    };


    const makeOriginalGroundData = (wallElements: any) => {
        let original: any = [];
        wallElements.forEach((item: any) => {
            original.push({
                id: item.id,
                x: item.x,
                y: item.y,
                x1: item.x1,
                y1: item.y1,
            });
        });
        return original;
    };

    const makeOriginalEntrancesData = (entrances: any) => {
        let original: any = [];
        entrances.forEach((item: any) => {
            original.push({
                x: item.x,
                y: item.y,
                rotation: item.rotation,
            });
        });
        return original;
    };

    const saveToJson = (label: string, floor: number, canvas: any) => {
        const [startingPointX, startingPointY] = getRoomCenter(wallElements);

        // recalculated coords
        let bookshelves = makeBookshelvesData(
            recalculateBookshelfCoordinates(startingPointX, startingPointY)
        );
        let ground = recalculateGroundCoordinates(startingPointX, startingPointY);
        let entrances = makeEntrancesData(
            recalculateEntrancesCoordinates(startingPointX, startingPointY)
        );

        // original coords
        let bookshelvesOriginal = makeOriginalBookshelvesData();
        let groundOriginal = makeOriginalGroundData(wallElements);
        let entrancesOriginal = makeOriginalEntrancesData(doorElements);

        const [minX, minY, maxX, maxY] = maxMinWallElements();

        let context = canvas!.getContext("2d");
        let res = context!.getSVG();
        console.log(res.viewBox);

        let viewBox = [minX, minY, maxX - minX, maxY - minY].join(" ");
        console.log(viewBox);


        res.removeAttribute("viewPort");
        console.log(res);

        // @ts-ignore
        let serializedSVG = new XMLSerializer().serializeToString(res);
        let base64Data = window.btoa(serializedSVG);

        let orgSpace = {
            label,
            floor,
            ground: groundOriginal,
            entrances: entrancesOriginal,
            bookshelves: bookshelvesOriginal,
        };

        let space = {
            label,
            floor,
            ground,
            entrances,
            bookshelves,
        };

        let svg = {
            label,
            data: `data:image/svg+xml;base64,${base64Data}`,
        };

        // console.log("TO KAJ JE PRERAČUNANO",{space});
        // console.log("ORIGINAL", orgSpace)

        // console.log({space, orgSpace, svg})

        return addSpace({space, orgSpace, svg}, abbr!);
    };


    const addDoors = () => {
        setDrawingDoor(!drawingDoor);
        setDrawingElement(DrawingElement.NONE);
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClose = () => setIsOpen(true);

    return (
        <>
            <Modal open={isOpen} onClose={onClose} saveToJson={saveToJson}/>
            <div className="topDiv">
                <div
                    className={`topDiv-element${radio === 0 ? "--checked" : ""}`}
                    onClick={handleElementSelection}
                >
                    <input
                        id="radio-select"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="0"
                    />
                    <label htmlFor="radio-select">
                        <svg
                            viewBox="0 0 320 512"
                            className={`${
                                radio === 0
                                    ? "topDiv-element-svgWhite"
                                    : "topDiv-element-svgBlack"
                            }`}
                        >
                            <path
                                d="M302.189 329.126H196.105l55.831 135.993c3.889 9.428-.555 19.999-9.444 23.999l-49.165 21.427c-9.165 4-19.443-.571-23.332-9.714l-53.053-129.136-86.664 89.138C18.729 472.71 0 463.554 0 447.977V18.299C0 1.899 19.921-6.096 30.277 5.443l284.412 292.542c11.472 11.179 3.007 31.141-12.5 31.141z"></path>
                        </svg>
                    </label>
                </div>
                <div
                    className={`topDiv-element${radio === 1 ? "--checked" : ""}`}
                    onClick={() => handleDrawingSelection(DrawingElement.WALL)}
                >
                    <input
                        id="radio-drawLine"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="1"
                    />
                    <label htmlFor="radio-drawLine">
                        <svg
                            viewBox="0 0 6 6"
                            className={`${
                                radio === 1
                                    ? "topDiv-element-svgWhite"
                                    : "topDiv-element-svgBlack"
                            }`}
                        >
                            <line
                                x1="0"
                                y1="3"
                                x2="6"
                                y2="3"
                                stroke="currentColor"
                                strokeLinecap="round"
                            ></line>
                        </svg>
                    </label>
                </div>
                <div
                    className={`topDiv-element${radio === 2 ? "--checked" : ""}`}
                    onClick={() => handleDrawingSelection(DrawingElement.BOOKSHELF)}
                >
                    <input
                        id="radio-drawRect"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="2"
                    />
                    <label htmlFor="radio-drawRect">
                        <svg
                            viewBox="0 0 448 512"
                            className={`${
                                radio === 2
                                    ? "topDiv-element-svgWhite"
                                    : "topDiv-element-svgBlack"
                            }`}
                        >
                            <path
                                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path>
                        </svg>
                    </label>
                </div>
                <div
                    className={`topDiv-element${radio === 4 ? "--checked" : ""}`}
                    onClick={handleEditMode}
                >
                    <input
                        id="radio-edit"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="4"
                    />
                    <label htmlFor="radio-edit">
                        <svg
                            viewBox="0 0 512 512"
                            className={`${
                                radio === 4
                                    ? "topDiv-element-svgWhite"
                                    : "topDiv-element-svgBlack"
                            }`}
                        >
                            <path
                                fill="currentColor"
                                d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className={`topDiv-element`} onClick={handleElementDelete}>
                    <input
                        id="radio-delete"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="3"
                    />
                    <label htmlFor="radio-delete">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                            viewBox="0 0 448 512"
                            className={"topDiv-element-svgBlack"}
                        >
                            <path
                                fill="currentColor"
                                d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className={`topDiv-element`} onClick={addDoors}>
                    <input
                        id="radio-door"
                        type="radio"
                        name="action-selection"
                        className="topDiv-elementRadio"
                        onChange={handleRadioChange}
                        value="4"
                    />
                    <label htmlFor="radio-door">
                        <img src="../../icons8-door-white.png" style={{height: "1em", objectFit: "contain"}} alt="nekaj" />
                    </label>
                </div>
                {/*<div className={`topDiv-element`}>*/}
                {/*    <button onClick={addDoors}>*/}
                {/*        </button>*/}
                {/*</div>*/}
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
                            {Array(Number(selectedElement.nb_of_shelves))
                                .fill(null)
                                .map((item: null, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="inputContainer">
                                                <label htmlFor="udk">Udk {index}: </label>
                                                <input
                                                    name={index.toString()}
                                                    id="udk"
                                                    type="text"
                                                    value={shelfUdk[index]}
                                                    onChange={handleChangeEdit}
                                                />
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            <button type="submit">Shrani udk</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="form">
                            <div className="inputContainer">
                                <label htmlFor="sh_rotation">Police v dolžino : </label>
                                <input
                                    name="sh_length"
                                    id="sh_rotation"
                                    type="number"
                                    min="1"
                                    value={bs_details.sh_length}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="sh_height">Število polic v višino : </label>
                                <input
                                    name="sh_height"
                                    id="sh_height"
                                    type="number"
                                    min="1"
                                    value={bs_details.sh_height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="sh_rotation">Rotacija : </label>
                                <input
                                    name="sh_rotation"
                                    id="sh_rotation"
                                    type="range"
                                    min="0"
                                    max="3"
                                    value={bs_details.sh_rotation}
                                    step="1"
                                    onChange={handleChange}
                                />
                            </div>
                            <img className="image" src={sh_image} alt="Usmerjenost police"/>
                            <button type="submit"> Vstavi omaro</button>
                        </form>
                    )}
                </div>
            )}

            <canvas
                id="canvas"
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                style={{backgroundColor: "lightgray"}}
            ></canvas>
        </>
    );
};
export default Canvas;