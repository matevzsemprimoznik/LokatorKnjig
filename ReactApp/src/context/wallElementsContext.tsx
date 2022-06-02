import React, {useContext, useState} from "react";

export type WallContextType = {
    walls:any
    setWalls: (el: any) => void
};

export const WallContext = React.createContext<WallContextType>({
    walls: [],
    setWalls: (el: any) => {}
});

const WallProvider = ({children}: any) => {
    const [walls, setWallElements] = useState<any>();


    const setWalls = (el: any) => {
        let wallEdges: any = [];

        el.forEach((item: any) => {
            wallEdges.push({
                start: {x: item.x, y: item.y},
                end: {x: item.x1, y: item.y1}
            })
        })
        setWallElements(wallEdges)
    }

    return <WallContext.Provider value={{walls, setWalls}}>{children}</WallContext.Provider>;
};

export default WallProvider;