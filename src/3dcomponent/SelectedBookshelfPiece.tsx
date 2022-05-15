import { useGLTF } from "@react-three/drei";
import React, { FC, Ref, useEffect, useRef, useState } from "react";
import bookshelf from "../assets/selectedBookshelf.glb";
import "@babylonjs/loaders/glTF";
import { GUI } from "dat.gui";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Roboto from "../assets/Roboto_Bold.json";
import { extend } from "react-three-fiber";
import Text from "./Text";

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
  udk: Array<number>;
}

extend({ TextGeometry });

const SelectedBookshelfPiece: FC<SelectedBookshelfPieceProps> = ({
  position,
  rotation = { x: 0, y: 0, z: 0 },
  udk,
}) => {
  const { nodes, materials }: any = useGLTF(bookshelf);

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SelectedCube.geometry}
        material={materials["CubeMaterial"]}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
      />
      <Text text={`${udk[0]}`} position={position} />
    </>
  );
};

export default SelectedBookshelfPiece;
