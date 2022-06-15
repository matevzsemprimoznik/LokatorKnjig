import {Drawable} from "roughjs/bin/core";

export enum ActionTypes {
    NONE = "NONE",
    DRAWING = "DRAWING",
    MOVING = "MOVING",
    SELECTING = "SELECTING",
    RESIZING = "RESIZING",
    EDITING = "EDITING"
}

export enum DrawingElement {
    NONE = "NONE",
    DOOR = "DOOR",
    WALL = "WALL",
    BOOKSHELF = "BOOKSHELF",
}

export enum ElementStyleType {
    SelectedBookshelf = "SELECTED_BOOKSHELF",
    UdkSettled = "UDK_SETTLED",
    Normal = "NORMAL",
}

export type ElementType = {
    id: number;
    x: number;
    y: number;
    x1: number;
    y1: number;
    element: Drawable;
    offsetX?: number;
    offsetY?: number;
    rotation?: number;
    nb_of_shelves?: number;
    udk?: Array<Array<string>>;
};

export type WallType = Omit<ElementType, "element">


export type DataType = {
    sh_length: number;
    sh_height: number;
    sh_rotation: number;
};
export type udkEdit = {
    [shelfPosition: number]: string;
};
