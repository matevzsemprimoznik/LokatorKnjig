import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {DataType, ElementType, WallType} from "../models/canvas_models/canvas";
import {bs_initial_details} from "../components/Canvas";

export type WallContextType = {
    // walls:any
    // setWalls: (el: any) => void
    wallElements: Array<WallType>
    setWallElements: Dispatch<SetStateAction<WallType[]>>,
    bookshelves: Array<ElementType>,
    setBookshelves: Dispatch<SetStateAction<ElementType[]>>,
    doorElements: any,
    setDoorElements: Dispatch<any>,
    bs_details: DataType,
    setBs_details: Dispatch<SetStateAction<DataType>>
};

export const WallContext = React.createContext<WallContextType>({
    // walls: [],
    // setWalls: (el: any) => {}
    wallElements: [],
    setWallElements: () => {
    },
    bookshelves: [],
    setBookshelves: () => {
    },
    doorElements: [],
    setDoorElements: () => {
    },
    bs_details: {
        sh_height: 0,
        sh_length: 0,
        sh_rotation: 0,
    },
    setBs_details: () => {}
});

const WallProvider = ({children}: any) => {
    // const [walls, setWallElements] = useState<any>();

    // const setWalls = (el: any) => {
    //     let wallEdges: any = [];
    //
    //     el.forEach((item: any) => {
    //         wallEdges.push({
    //             start: {x: item.x, y: item.y},
    //             end: {x: item.x1, y: item.y1}
    //         })
    //     })
    //     setWallElements(wallEdges)
    // }

    const [wallElements, setWallElements] = useState<Array<WallType>>([]);
    const [bookshelves, setBookshelves] = useState<Array<ElementType>>([]);
    const [doorElements, setDoorElements] = useState<any>([]);
    const [bs_details, setBs_details] = useState<DataType>(bs_initial_details);

    return <WallContext.Provider value={{wallElements, setWallElements, bookshelves, setBookshelves, doorElements, setDoorElements, bs_details, setBs_details}}>{children}</WallContext.Provider>;
};

export default WallProvider;