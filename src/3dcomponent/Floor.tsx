import { useGLTF } from '@react-three/drei';
import React, { FC } from 'react';
// @ts-ignore
import floor from '../static/floor.glb';

interface FloorProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
}

const Floor: FC<FloorProps> = ({ position }) => {
  const { nodes, materials }: any = useGLTF(floor);
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Floor.geometry}
      material={materials['FloorMaterial']}
      position={[position.x, position.y, position.z]}
      scale={[1.5, 1, 1]}
    />
  );
};

export default Floor;