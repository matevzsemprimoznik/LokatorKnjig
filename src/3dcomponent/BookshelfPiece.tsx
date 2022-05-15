import { useGLTF } from "@react-three/drei";
import React, { FC, useState } from "react";
import bookshelf from "../assets/bookshelf.glb";
import "@babylonjs/loaders/glTF";
import Text from "./Text";

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

const BookshelfPiece: FC<BookshelfPieceProps> = ({ position, rotation = { x: 0, y: 0, z: 0 }, udk }) => {
  const { nodes, materials }: any = useGLTF(bookshelf);

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["CubeMaterial"]}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
      />
      <Text text={`${udk[0]}`} position={position} />
    </>
  );
};

export default BookshelfPiece;
