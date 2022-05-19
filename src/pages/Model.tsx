import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useLoader, Canvas } from '@react-three/fiber';
import data from '../data.json';
import Floor from '../3dcomponent/Floor';
import SelectedBookshelfPiece from '../3dcomponent/SelectedBookshelfPiece';
import BookshelfPiece from '../3dcomponent/BookshelfPiece';
import { useThree } from '@react-three/fiber';
import { useParams } from 'react-router-dom';
import React from 'react';

const Model = (props: any) => {
  const { selected } = props;
  const [selectedUDK, setSelectedUDK] = React.useState("");

  const getClosestUDK = () => {
    if (selected) {
      let parsedUDK = selected.split(".");
      let general = parsedUDK[0];

      let closest = "";

      let filtered: any[] = [];
      //filters through json to get smaller array of shelfs with the same first part of UDK (before first ".")
      filtered = data.police.filter((element) => {
        let udk = element.udk;

        for (let i = 0; i < udk.length; i++) {
          let currentudk = udk[i].toString();

          let splitted = currentudk.split(".");

          return (general.includes(splitted[0]));
        }
      });

      let newestFiltered: string[] = [];

      //goes through entire array of parsed UDKs and through filtered to 
      //compare more specific [1-n] parts of selected UDK
      for (let i = 0; i < parsedUDK.length; i++) {
        let specificUDK = parsedUDK[i];

        for (let j = 0; j < filtered.length; j++) {
          for (let k = 0; k < filtered[j].udk.length; k++) {

            //sets current udk to be that of the one currently being checked and splits it
            let currentudk = filtered[j].udk[k].toString().split(".");

            //checks if the current udk has that many "specific" parts
            if(currentudk[i]) {
              if (currentudk.includes(specificUDK) && !newestFiltered.includes(specificUDK)) {
                newestFiltered.push(specificUDK);
              }
            }
          }
        }
      }

      //makes the closest udk back into a specific udk string
      if (newestFiltered.length != 0) {
        for (let i = 0; i < newestFiltered.length; i++) {
          if (i != newestFiltered.length - 1) {
            closest += newestFiltered[i] + ".";
          }
          else {
            closest += newestFiltered[i];
          }
        }
      }

      setSelectedUDK(closest);
    }
  }

  if(selectedUDK == "") {
    getClosestUDK();
  }

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

        <Floor position={{ x: 0, y: 0.05, z: 0 }} />

        <OrbitControls />
    </>
  );
};

export default Model;