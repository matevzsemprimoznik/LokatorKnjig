import {Room} from "../models/library";
import React, {FC, memo} from "react";
import {MemoizedRoomModel} from "./Model3D";
import {ThreeEvent} from "react-three-fiber";
import RoomModel2D from "./RoomModel2D";

interface FloorModelProps {
    floorData: Array<Room>
    selected: string
    selectRoom: (event: ThreeEvent<MouseEvent>) => void
}

const FloorModel2D: FC<FloorModelProps> = ({floorData, selected, selectRoom}) => {
    return <> {floorData.map((room, index) => <RoomModel2D key={index} roomData={room} selectedUDK={selected}
                                                           selectRoom={selectRoom}/>)}</>
}
export default memo(FloorModel2D)