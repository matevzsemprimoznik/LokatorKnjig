import {useGLTF} from '@react-three/drei';
import React, {FC} from 'react';
import {ThreeEvent} from 'react-three-fiber';
import {MeshBasicMaterial, Vector3} from 'three';
import {ConvexGeometry} from 'three/examples/jsm/geometries/ConvexGeometry';
import {Position} from '../models/library';

interface GroundProps {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    onDoubleClick?: any;
    edges: Array<Position>;
    roomLabel: string
}

const Ground: FC<GroundProps> = ({position, onDoubleClick, edges, rotation, roomLabel}) => {
    return (
        <mesh
            onDoubleClick={() => onDoubleClick(roomLabel)}
            castShadow
            receiveShadow
            geometry={new ConvexGeometry(edges.map((edge) => new Vector3(edge.x / 20, edge.y / 20, edge.z / 20)))}
            material={new MeshBasicMaterial({color: '#e9ecef'})}
            position={[position.x / 20, position.y, position.z / 20]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[1, 1, 1]}
        />
    );
};

export default Ground;
