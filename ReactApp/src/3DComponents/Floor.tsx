import { useGLTF } from "@react-three/drei";
import React, { FC } from "react";
import floor from "../assets/floor.glb";
import {ThreeEvent} from "react-three-fiber";
import {log} from "util";

interface FloorProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void
}

const Floor: FC<FloorProps> = ({ position , onDoubleClick}) => {
  const { nodes, materials }: any = useGLTF(floor);
  return (
    <mesh
        onDoubleClick={onDoubleClick}
      castShadow
      receiveShadow
      geometry={nodes.Floor.geometry}
      material={materials["FloorMaterial"]}
      position={[position.x, position.y, position.z]}
      scale={[1.5, 1, 1]}
    />
  );
};

export default Floor;
