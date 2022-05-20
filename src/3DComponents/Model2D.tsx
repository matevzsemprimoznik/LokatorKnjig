import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useLoader, Canvas } from '@react-three/fiber';
import data from '../data.json';
import Floor from '../3DComponents/Floor';
import SelectedBookshelfPiece from '../3DComponents/SelectedBookshelfPiece';
import BookshelfPiece from '../3DComponents/BookshelfPiece';
import { useThree, extend } from '@react-three/fiber';
import { BoxGeometry } from 'three';
import * as THREE from 'three';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import React, { FC, useRef } from 'react';

extend({ OutlinePass });

interface Model2DProps {
  selected: any;
}
const Model2D: FC<Model2DProps> = ({ selected }) => {
  const pos = useRef({
    x: null,
    z: null,
  });

  return (
    <>
      {data.police.map((polica: any, index: number) => {
        if (polica.udk.includes(selected)) {
          return (
            <mesh key={index}>
              <mesh position={[polica.pozicija.x, 0.1, polica.pozicija.z]}>
                <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                <meshStandardMaterial attach='material' color={'#E6EFE9'} />
              </mesh>
              <mesh position={[polica.pozicija.x, 0.102, polica.pozicija.z]} scale={[0.98, 1, 0.8]}>
                <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                <meshStandardMaterial attach='material' color={'#3574AE'} />
              </mesh>
            </mesh>
          );
        }

        if (JSON.stringify(pos.current) !== JSON.stringify({ x: polica.pozicija.x, z: polica.pozicija.z })) {
          pos.current = { x: polica.pozicija.x, z: polica.pozicija.z };
          return (
            <mesh key={index}>
              <mesh position={[polica.pozicija.x, 0.1, polica.pozicija.z]}>
                <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                <meshStandardMaterial attach='material' color={'#E6EFE9'} />
              </mesh>
              <mesh position={[polica.pozicija.x, 0.101, polica.pozicija.z]} scale={[0.98, 1, 0.8]}>
                <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                <meshStandardMaterial attach='material' color={'#AE7C44'} />
              </mesh>
            </mesh>
          );
        }
      })}
    </>
  );
};

export default Model2D;
