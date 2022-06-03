import { useGLTF } from '@react-three/drei';
import React, { FC, useState } from 'react';
import bookshelf from '../assets/bookshelf2.glb';
import '@babylonjs/loaders/glTF';
import Text from './Text';

interface BookshelfPieceProps {
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
  udk: Array<string>;
  type: any;
}

const BookshelfPiece: FC<BookshelfPieceProps> = ({ position, type, rotation = { x: 0, y: 0, z: 0 }, udk }) => {
  const { nodes, materials }: any = useGLTF(type);

  if(udk == null || (Array.isArray(udk) && udk.length === 0))
    udk = ['']

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['CubeMaterial']}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
      />
      <Text text={`${udk[0]}`} position={position} rotation={rotation} />
    </>
  );
};

export default BookshelfPiece;
