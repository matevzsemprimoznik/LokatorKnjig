import {useGLTF} from "@react-three/drei";
import React, {FC} from "react";
import {ThreeEvent} from "react-three-fiber";
import {BackSide, MeshBasicMaterial, Vector3} from "three";
import {ConvexGeometry} from "three/examples/jsm/geometries/ConvexGeometry";
import {Position} from "../models/library";

interface GroundProps {
    position: {
        x: number;
        y: number;
        z: number;
    };
    onDoubleClick?: (parameter: any) => void
    edges: Array<Position>
    roomLabel?: string
}

const Ground: FC<GroundProps> = ({position, onDoubleClick, edges, roomLabel}) => {

    const calculateInnerEgdes = () => {
        return edges.map(edge => {
            const difference = 0.2
            const newEdge = {
                x: edge.x > 0 ? edge.x - difference : edge.x + difference,
                y: edge.y,
                z: edge.z > 0 ? edge.z - difference : edge.z + difference
            }
            return new Vector3(newEdge.x, newEdge.y, newEdge.z)
        })
    }
    console.log(position)
    const innerEdges = calculateInnerEgdes()

    return (<>
            <mesh
                onDoubleClick={(event) => onDoubleClick ? onDoubleClick(roomLabel || event) : {}}
                castShadow
                receiveShadow
                geometry={new ConvexGeometry(innerEdges)}
                material={new MeshBasicMaterial({color: '#e9ecef'})}
                position={[position.x, position.y + 0.005, position.z]}
                scale={[1, 1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={new ConvexGeometry(edges.map(edge => new Vector3(edge.x, edge.y, edge.z)))}
                material={new MeshBasicMaterial({color: '#7f8487'})}
                position={[position.x, position.y, position.z]}
                scale={[1, 1, 1]}
            />
        </>

    );
};

export default Ground;
