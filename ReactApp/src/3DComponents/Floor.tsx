import { useGLTF } from "@react-three/drei";
import React, { FC } from "react";
import floorPiece1 from "../assets/floor-piece1.glb";
import floorPiece2 from "../assets/floor-piece2.glb";
import floorPiece3 from "../assets/floor-piece3.glb";
import {ThreeEvent} from "react-three-fiber";

interface FloorProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void
}

const Floor: FC<FloorProps> = ({ position , onDoubleClick}) => {
  const { nodes, materials: materials1 }: any = useGLTF(floorPiece1);
  const { nodes: nodes2, materials: materials2 }: any = useGLTF(floorPiece2);
  const { nodes: nodes3, materials: materials3 }: any = useGLTF(floorPiece3);

  const materials = [materials1, materials2, materials3]
  console.log(materials[Math.floor(Math.random()*materials.length)])

  const scale = 4

  const getPositions = () => {
    let x = -0.4
    const positions = []
    for(let i = 0; i < 8; i++){
      if(i % 2 === 0){
        positions.push([x + position.x, 0, 0.25 + position.z, 1])
        positions.push([x + position.x, 0, -0.25 + position.z, 1])
      }
      else{
        positions.push([x + position.x, 0, 0 + position.z, 1])
        positions.push([x + position.x, 0, 0.375 + position.z, 0.5])
        positions.push([x + position.x, 0, -0.375 + position.z, 0.5])
      }
      x += 0.1
    }
    return positions
  }

  const getRandomMaterial = () => {
    const material = materials[Math.floor(Math.random()*materials.length)]
    return material[Object.keys(material)[0]]
  }
  return (
   <> {getPositions().map((position, index) => <mesh
       key={index}
       onDoubleClick={onDoubleClick}
       castShadow
       receiveShadow
       geometry={nodes.FloorPiece1.geometry}
       material={getRandomMaterial()}
       position={[position[0] * scale, position[1], position[2] * scale]}
       scale={[scale, scale, position[3] * scale]}
   />)}
   </>
  );
};

export default Floor;
