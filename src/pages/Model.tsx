import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useLoader, Canvas } from '@react-three/fiber';
import data from '../data.json';
import Floor from '../3dcomponent/Floor';
import SelectedBookshelfPiece from '../3dcomponent/SelectedBookshelfPiece';
import BookshelfPiece from '../3dcomponent/BookshelfPiece';
import { useThree } from '@react-three/fiber';

const Model = () => {
  const selectedUDK = 20;
  useThree(({ camera }) => {
    camera.rotation.set(Math.PI / 3, 0, 0);
  });
  return (
    <>
      
        <ambientLight intensity={0.3} />
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
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        {data.police.map((polica: any) =>
          polica.udk.includes(selectedUDK) ? (
            <SelectedBookshelfPiece
              key={polica.udk[0]}
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
            />
          ) : (
            <BookshelfPiece
              key={polica.udk[0]}
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
            />
          )
        )}

        <Floor position={{ x: 0, y: 0.05, z: 0 }} />

        <OrbitControls />
    </>
  );
};

export default Model;
