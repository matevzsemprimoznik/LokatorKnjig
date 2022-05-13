import { useGLTF } from '@react-three/drei';
import React, { FC, useState } from 'react';
// @ts-ignore
import bookshelf from '../assets/selectedBookshelf.glb';
import '@babylonjs/loaders/glTF';
import { GUI } from 'dat.gui';
import * as THREE from 'three';

interface SelectedBookshelfPieceProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation?: {
    x: number;
    y: number;
    z: number;
  };
}

const SelectedBookshelfPiece: FC<SelectedBookshelfPieceProps> = ({
  position,
  rotation = { x: 0, y: 0, z: 0 },
}) => {
  const { nodes, materials }: any = useGLTF(bookshelf);

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.SelectedCube.geometry}
      material={materials['CubeMaterial']}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    />
  );
};

export default SelectedBookshelfPiece;
