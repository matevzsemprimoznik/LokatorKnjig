import {
  FirstPersonControls,
  MeshWobbleMaterial,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useLoader, Canvas, useFrame } from '@react-three/fiber';
import data from '../data.json';
import Floor from '../3dcomponent/Floor';
import SelectedBookshelfPiece from '../3dcomponent/SelectedBookshelfPiece';
import BookshelfPiece from '../3dcomponent/BookshelfPiece';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Model = () => {
  const selectedUDK = 20;

  const [position, setPosition] = useState([0, 2, 10]);

  const camera = useRef<any>(null);
  const firstPerson = useRef<any>(null);
  useFrame((state) => {
    if (!!camera.current) {
      const { x, y } = state.mouse;
      //setPosition((oldState) => [oldState[0] + 0.01, 2, 10]);
      //console.log(camera.current.position);
    }
  });

  useEffect(() => {
    if (!!camera.current) console.log(camera.current);
    if (!!firstPerson.current) {
      console.log(firstPerson.current);
      firstPerson.current.mouseDragOn = true;
      firstPerson.current.moveLeft = true;
      firstPerson.current.update();
      console.log(firstPerson.current);
    }
  }, [camera.current]);
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={new THREE.Vector3(position[0], position[1], position[2])}
        ref={camera}
      />
      <FirstPersonControls ref={firstPerson} />
      <ambientLight intensity={1} />
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color={'blue'} />
      </mesh>
      {/* <OrbitControls /> */}
    </>
  );
};

export default Model;
