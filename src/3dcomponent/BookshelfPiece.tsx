import { useGLTF } from '@react-three/drei';
import React, { FC, useState } from 'react';
// @ts-ignore
import bookshelf from '../assets/bookshelf.glb';
import '@babylonjs/loaders/glTF';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import Roboto from '../assets/Roboto_Bold.json';
import { extend } from 'react-three-fiber';

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
  udk: Array<number>;
}

extend({TextGeometry});

const BookshelfPiece: FC<BookshelfPieceProps> = ({
  position,
  rotation = { x: 0, y: 0, z: 0 },
  udk
}) => {
  const { nodes, materials }: any = useGLTF(bookshelf);

  const font = new FontLoader().parse(Roboto);

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
      <mesh 
        position={[position.x,position.y,position.z]} 
        rotation={[rotation.x, rotation.y, rotation.z]}
      >
        {/* @ts-ignore*/}
        <textGeometry args={[`${udk[0]}`, {font, size:0.1, height:0}]} />
      </mesh>
    </>
  );
};

export default BookshelfPiece;
