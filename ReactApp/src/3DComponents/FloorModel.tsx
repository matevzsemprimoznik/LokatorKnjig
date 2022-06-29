import {Room} from "../models/library";
import React, {FC, memo} from "react";
import RoomModel from "./Model3D";
import {ThreeEvent} from "react-three-fiber";
import {ModelType} from "../context/modelContext";

interface FloorModelProps {
    floorData: Array<Room>
    selected: string
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void
}

const FloorModel: FC<FloorModelProps> = ({floorData, selected, moveCameraToDoubleClickedPoint}) => {
    return <>{floorData.map((room, index) => <RoomModel key={index + Math.round(Math.random() * 1000)} roomData={room}
                                                        selectedUDK={selected}
                                                        moveCameraToDoubleClickedPoint={moveCameraToDoubleClickedPoint}/>)}</>

}
export default memo(FloorModel)