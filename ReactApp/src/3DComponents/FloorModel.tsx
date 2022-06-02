import {Room} from "../models/library";
import React, {FC, memo} from "react";
import {MemoizedRoomModel} from "./Model3D";
import {ThreeEvent} from "react-three-fiber";

interface FloorModelProps{
    floorData: Array<Room>
    selected: string
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void
}
const FloorModel:FC<FloorModelProps> = ({floorData, selected,moveCameraToDoubleClickedPoint}) => {
    return <> {floorData.map((room, index) => <MemoizedRoomModel key={index} roomData={room} selectedUDK={selected} moveCameraToDoubleClickedPoint={moveCameraToDoubleClickedPoint}/>)}</>
}
export default memo(FloorModel)