import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import { useLoader, Canvas } from "@react-three/fiber";
import data from "../data.json";
import Floor from "../3DComponents/Floor";
import SelectedBookshelfPiece from "../3DComponents/SelectedBookshelfPiece";
import BookshelfPiece from "../3DComponents/BookshelfPiece";
import { useThree, extend } from "@react-three/fiber";
import { BoxGeometry } from "three";
import * as THREE from "three";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { useRef } from "react";

extend({ OutlinePass });

const Model2D = () => {
  const selectedUDK = "681.5";

  const pos = useRef({
    x: null,
    z: null,
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight
        castShadow
        position={[5, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {data.police.map((polica: any, index: number) => {
        if (polica.udk.includes(selectedUDK)) {
          return (
            <mesh key={index}>
              <mesh position={[polica.pozicija.x, 0.1, polica.pozicija.z]}>
                <boxGeometry attach="geometry" args={[2, 0, 0.6]} />
                <meshStandardMaterial attach="material" color={"black"} />
              </mesh>
              <mesh position={[polica.pozicija.x, 0.102, polica.pozicija.z]} scale={[0.98, 1, 0.8]}>
                <boxGeometry attach="geometry" args={[2, 0, 0.6]} />
                <meshStandardMaterial attach="material" color={"blue"} />
              </mesh>
            </mesh>
          );
        }

        if (JSON.stringify(pos.current) !== JSON.stringify({ x: polica.pozicija.x, z: polica.pozicija.z })) {
          pos.current = { x: polica.pozicija.x, z: polica.pozicija.z };
          return (
            <mesh key={index}>
              <mesh position={[polica.pozicija.x, 0.1, polica.pozicija.z]}>
                <boxGeometry attach="geometry" args={[2, 0, 0.6]} />
                <meshStandardMaterial attach="material" color={"black"} />
              </mesh>
              <mesh position={[polica.pozicija.x, 0.101, polica.pozicija.z]} scale={[0.98, 1, 0.8]}>
                <boxGeometry attach="geometry" args={[2, 0, 0.6]} />
                <meshStandardMaterial attach="material" color={"red"} />
              </mesh>
            </mesh>
          );
        }
      })}

      <Floor position={{ x: 0, y: 0.05, z: 0 }} />

      <OrbitControls />
    </>
  );
};

export default Model2D;
