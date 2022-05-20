import { MeshWobbleMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useLoader, Canvas, useFrame, PerspectiveCameraProps, OrthographicCameraProps } from '@react-three/fiber';
import data from '../data.json';
import Floor from '../3DComponents/Floor';
import SelectedBookshelfPiece from '../3DComponents/SelectedBookshelfPiece';
import BookshelfPiece from '../3DComponents/BookshelfPiece';
import { useThree } from '@react-three/fiber';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { OrbitControls as OrbitControlsProps } from 'three-stdlib';
import * as THREE from 'three';

let nekaj = false;

const Model = () => {
  const selectedUDK = 20;
  const perspectiveCameraRef = useRef<PerspectiveCameraProps>(null);
  const triggerSwitchFrom3dTo2d = useRef(false);
  const orbitControlsRef = useRef<OrbitControlsProps>(null);
  const [defualtCamera, setDefaultCamera] = useState<'perspective' | 'ortographic'>('perspective');
  const pos = useRef({
    x: null,
    z: null,
  });
  useFrame(() => {
    if (triggerSwitchFrom3dTo2d.current) moveCameraTo2dView(0.5);
  });

  const moveCameraTo2dView = (speed: number) => {
    if (
      orbitControlsRef.current == null ||
      perspectiveCameraRef.current == null ||
      perspectiveCameraRef.current.position == null ||
      !(perspectiveCameraRef.current.position instanceof THREE.Vector3)
    )
      return;

    orbitControlsRef.current.enableZoom = false;
    orbitControlsRef.current.enableRotate = false;

    const position = perspectiveCameraRef.current.position;

    const azimuthalAngle = orbitControlsRef.current.getAzimuthalAngle();
    const polarAngle = orbitControlsRef.current.getPolarAngle();

    if (Math.abs(azimuthalAngle) < 0.1 && Math.abs(polarAngle) < 0.1 && position?.y > 30) {
      triggerSwitchFrom3dTo2d.current = false;
      orbitControlsRef.current.enableZoom = true;
      console.log('end');
      setDefaultCamera('ortographic');

      return;
    }
    if (azimuthalAngle < -speed) orbitControlsRef.current.setAzimuthalAngle(azimuthalAngle + speed);
    else if (azimuthalAngle > speed) orbitControlsRef.current.setAzimuthalAngle(azimuthalAngle - speed);
    if (polarAngle < -speed) orbitControlsRef.current.setPolarAngle(polarAngle + speed);
    else if (polarAngle > speed) orbitControlsRef.current.setPolarAngle(polarAngle - speed);
    console.log(Math.abs(azimuthalAngle), polarAngle);

    if (Math.abs(azimuthalAngle) <= speed) {
      const direction = azimuthalAngle / Math.abs(azimuthalAngle);
      orbitControlsRef.current.setAzimuthalAngle(
        Number.isNaN(direction) ? 0 : direction * (Math.abs(azimuthalAngle) - 0.1)
      );
    }

    if (Math.abs(polarAngle) <= speed) {
      const direction = polarAngle / Math.abs(polarAngle);
      orbitControlsRef.current.setPolarAngle(Number.isNaN(direction) ? 0 : direction * (Math.abs(polarAngle) - 0.1));
    }

    if (position.y < 30) perspectiveCameraRef.current.position.y += speed;
  };
  useEffect(() => {
    setInterval(() => {
      triggerSwitchFrom3dTo2d.current = true;
    }, 5000);
  }, []);
  return (
    <>
      {console.log(defualtCamera)}
      <PerspectiveCamera
        ref={perspectiveCameraRef}
        makeDefault={defualtCamera === 'perspective'}
        position={[0, 5, 10]}
      />
      <OrthographicCamera makeDefault={defualtCamera === 'ortographic'} position={[0, 10, 0]} zoom={32} />
      <ambientLight intensity={defualtCamera === 'ortographic' ? 1.3 : 0.3} />
      <directionalLight
        castShadow
        position={[5, 10, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {defualtCamera === 'perspective' && (
        <>
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
        </>
      )}

      {defualtCamera === 'perspective' ? (
        <MemoizedBookshelfs selectedUDK={selectedUDK} />
      ) : (
        data.police.map((polica: any, index: number) => {
          if (polica.udk.includes(selectedUDK)) {
            return (
              <mesh key={index}>
                <mesh position={[polica.pozicija.x, 0.1, polica.pozicija.z]}>
                  <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                  <meshStandardMaterial attach='material' color={'E6EFE9'} />
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
                  <meshStandardMaterial attach='material' color={'E6EFE9'} />
                </mesh>
                <mesh position={[polica.pozicija.x, 0.101, polica.pozicija.z]} scale={[0.98, 1, 0.8]}>
                  <boxGeometry attach='geometry' args={[2, 0, 0.6]} />
                  <meshStandardMaterial attach='material' color={'#AE7C44'} />
                </mesh>
              </mesh>
            );
          }
        })
      )}

      <Floor position={{ x: 0, y: 0.05, z: 0 }} />
      <OrbitControls
        ref={orbitControlsRef}
        mouseButtons={
          defualtCamera === 'ortographic'
            ? {
                LEFT: THREE.MOUSE.RIGHT,
                MIDDLE: THREE.MOUSE.MIDDLE,
                RIGHT: THREE.MOUSE.LEFT,
              }
            : {
                LEFT: THREE.MOUSE.LEFT,
                MIDDLE: THREE.MOUSE.MIDDLE,
                RIGHT: THREE.MOUSE.RIGHT,
              }
        }
      />
    </>
  );
};

export default Model;

interface BookShelfsProps {
  selectedUDK: number;
}
const BookShelfs: FC<BookShelfsProps> = ({ selectedUDK }) => {
  return (
    <>
      {data.police.map((polica: any, index: number) =>
        polica.udk.includes(selectedUDK) ? (
          <SelectedBookshelfPiece
            key={index}
            position={{
              x: polica.pozicija.x,
              y: polica.pozicija.y,
              z: polica.pozicija.z,
            }}
            udk={polica.udk}
            rotation={{
              x: 0,
              y: polica.rotacija === 0 ? 0 : Math.PI,
              z: 0,
            }}
          />
        ) : (
          <BookshelfPiece
            key={index}
            position={{
              x: polica.pozicija.x,
              y: polica.pozicija.y,
              z: polica.pozicija.z,
            }}
            rotation={{
              x: 0,
              y: polica.rotacija === 0 ? 0 : Math.PI,
              z: 0,
            }}
            udk={polica.udk}
          />
        )
      )}
    </>
  );
};
const MemoizedBookshelfs = memo(BookShelfs);
