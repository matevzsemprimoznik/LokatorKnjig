import React, {FC, useEffect, useMemo, useState} from "react";
import {BackSide, BoxGeometry, InstancedMesh, Matrix4, MeshBasicMaterial} from "three";
import {Entrance, Position} from "../models/library";

interface EntrancesProps {
    entrances: Entrance[]
    position: Position
}

const Entrances: FC<EntrancesProps> = ({entrances, position}) => {
    const [entrancesMesh, setEntrancesMesh] = useState<InstancedMesh>()
    const entranceGeometry = useMemo(() => new BoxGeometry(2.5, 0.2, 0), [])
    const entranceMaterial = useMemo(() => new MeshBasicMaterial({color: '#0073d3'}), [])
    console.log(entrances, position)
    useEffect(() => {
        const entrancesInstanceMesh = new InstancedMesh(entranceGeometry, entranceMaterial, entrances.length)
        entrances.map((entrance, index) => {
            const defaultRotationMatrix = new Matrix4().makeRotationX(Math.PI / 2)
            const entranceTranslationMatrix = new Matrix4().makeTranslation(entrance.position.x / 20, 0.02, entrance.position.z / 20)
            const entranceRotationMatrix = new Matrix4().makeRotationY(entrance.rotation / 180 * Math.PI)
            const entranceMatrix = new Matrix4().multiply(entranceTranslationMatrix).multiply(entranceRotationMatrix).multiply(defaultRotationMatrix)

            entrancesInstanceMesh.setMatrixAt(index, entranceMatrix)
        })
        setEntrancesMesh(entrancesInstanceMesh)
        console.log(entrancesInstanceMesh)

    }, [entrances])
    return <>
        {/* @ts-ignore*/}
        {entrancesMesh && <instancedMesh {...entrancesMesh}
                                         position={[position.x, position.y, position.z]}/>}
    </>

}
export default Entrances