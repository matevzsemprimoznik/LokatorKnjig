import React, { FC, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Roboto from "../assets/Roboto_Bold.json";

interface TextProps {
  text: string;
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
  size?: number,
  color?: string
}
const Text: FC<TextProps> = ({ text, color='white', size = 0.1, position, rotation = { x: 0, y: 0, z: 0 } }) => {
  const textRef = useRef<any>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!!textRef.current) {
      const vectorSize = new THREE.Vector3();
      textRef.current?.geometry?.boundingBox?.getSize(vectorSize);
      setOffset(vectorSize.x / 2);
    }
  }, []);

  const font = new FontLoader().parse(Roboto);
  const geometry: any = new TextGeometry(text, {
    font: font,
    size: size,
    height: 0.1,
  });

  const material = [new THREE.MeshPhongMaterial({ color })];
  return (
    <mesh
      ref={textRef}
      position={[position.x,position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      geometry={geometry}
      material={material}
    ></mesh>
  );
};

export default Text;
