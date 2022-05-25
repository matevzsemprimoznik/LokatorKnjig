import { FirstPersonControls, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import Floor from './Floor';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ModelType } from '../context/modelContext';
import { MemoizedModel3D } from './Model3D';
import Model2D from './Model2D';
import { Raycaster } from 'three';
import { PerspectiveCameraProps, ThreeEvent } from 'react-three-fiber';
import FirstPersonCamera from './FirstPersonCamera';

interface ModelProps {
  selected: any;
  modelType: ModelType;
  setModelType: (modelType: ModelType) => void;
}

const Model: FC<ModelProps> = ({ selected, modelType, setModelType }) => {
  const perspectiveCameraRef = useRef<PerspectiveCameraProps>(null);
  const perspectiveCameraPositionRef = useRef({ x: 0, y: 5, z: 10 });
  //const orbitControlsRef = useRef<OrbitControlsProps>(null);

  // useFrame(() => {
  //     if (triggerSwitchFrom3dTo2d.current) {
  //         triggerSwitchFrom3dTo2d.current = false;
  //         // @ts-ignore
  //         orbitControlsRef.current.enableZoom = true;
  //         setDefaultCamera('ortographic');
  //     };
  // });

  // useEffect(() => {
  //     if (!isFirstRender.current) triggerSwitchFrom3dTo2d.current = true;
  //     isFirstRender.current = false;
  // }, [modelType]);
  //
  // const moveCameraTo2dView = (speed: number) => {
  //     if (
  //         orbitControlsRef.current == null ||
  //         perspectiveCameraRef.current == null ||
  //         perspectiveCameraRef.current.position == null ||
  //         !(perspectiveCameraRef.current.position instanceof THREE.Vector3)
  //     )
  //         return;
  //
  //     orbitControlsRef.current.enableZoom = false;
  //     orbitControlsRef.current.enableRotate = false;
  //
  //     const position = perspectiveCameraRef.current.position;
  //
  //     const azimuthalAngle = orbitControlsRef.current.getAzimuthalAngle();
  //     const polarAngle = orbitControlsRef.current.getPolarAngle();
  //
  //     if (Math.abs(azimuthalAngle) < 0.1 && Math.abs(polarAngle) < 0.1 && position?.y > 30) {
  //         triggerSwitchFrom3dTo2d.current = false;
  //         orbitControlsRef.current.enableZoom = true;
  //         setDefaultCamera('ortographic');
  //         return;
  //     }
  //     if (azimuthalAngle < -speed) orbitControlsRef.current.setAzimuthalAngle(azimuthalAngle + speed);
  //     else if (azimuthalAngle > speed) orbitControlsRef.current.setAzimuthalAngle(azimuthalAngle - speed);
  //     if (polarAngle < -speed) orbitControlsRef.current.setPolarAngle(polarAngle + speed);
  //     else if (polarAngle > speed) orbitControlsRef.current.setPolarAngle(polarAngle - speed);
  //     console.log(Math.abs(azimuthalAngle), polarAngle);
  //
  //     if (Math.abs(azimuthalAngle) <= speed) {
  //         const direction = azimuthalAngle / Math.abs(azimuthalAngle);
  //         orbitControlsRef.current.setAzimuthalAngle(
  //             Number.isNaN(direction) ? 0 : direction * (Math.abs(azimuthalAngle) - 0.1)
  //         );
  //     }
  //
  //     if (Math.abs(polarAngle) <= speed) {
  //         const direction = polarAngle / Math.abs(polarAngle);
  //         orbitControlsRef.current.setPolarAngle(Number.isNaN(direction) ? 0 : direction * (Math.abs(polarAngle) - 0.1));
  //     }
  //
  //     if (position.y < 30) perspectiveCameraRef.current.position.y += speed;
  // };

  // const canvas = document.getElementsByClassName('canvas')[0]
  // const raycaster = new THREE.Raycaster()
  // const mousePosition = new THREE.Vector2();
  //
  // canvas.addEventListener('click', function getClicked3DPoint(evt:any) {
  //     evt.preventDefault();
  //
  //     mousePosition.x = ((evt.clientX - canvasPosition.left) / 1920) * 2 - 1;
  //     mousePosition.y = -((evt.clientY - canvasPosition.top) / 500) * 2 + 1;
  //
  //     raycaster.setFromCamera(mousePosition, perspectiveCameraRef.current);
  //     var intersects = raycaster.intersectObjects(scene.getObjectByName('MyObj_s').children, true);
  //
  //     if (intersects.length > 0)
  //         return intersects[0].point;
  // };)

  const moveCameraToDoubleClickedPoint = (event: ThreeEvent<MouseEvent>) => {
    perspectiveCameraPositionRef.current = { ...event.point, y: 2 };
    setModelType(ModelType.FIRST_PERSON);
  };

  return (
    <>
      {modelType === ModelType.FIRST_PERSON ? (
        <FirstPersonCamera />
      ) : (
        <>
          <OrbitControls
            enableRotate={modelType === ModelType._3D}
            mouseButtons={
              modelType === ModelType._2D
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
          <PerspectiveCamera
            makeDefault={modelType === ModelType._3D}
            position={[
              perspectiveCameraPositionRef.current.x,
              perspectiveCameraPositionRef.current.y,
              perspectiveCameraPositionRef.current.z,
            ]}
            far={60}
            ref={perspectiveCameraRef}
          />
          <OrthographicCamera makeDefault={modelType === ModelType._2D} position={[0, 10, 0]} zoom={26} />
        </>
      )}

      <ambientLight intensity={0.3} />
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

      <>
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
      </>

      <MemoizedModel3D selectedUDK={selected} />

      <Floor position={{ x: 0, y: 0.05, z: 0 }} onDoubleClick={moveCameraToDoubleClickedPoint} />
    </>
  );
};

export default Model;

/* const [selectedUDK, setSelectedUDK] = React.useState('');

  const getClosestUDK = () => {
    if (selected) {
      let parsedUDK = selected.split('.');
      let general = parsedUDK[0];

      let closest = '';

      let filtered: any[] = [];
      //filters through json to get smaller array of shelfs with the same first part of UDK (before first ".")
      filtered = data.police.filter((element) => {
        let udk = element.udk;

        for (let i = 0; i < udk.length; i++) {
          let currentudk = udk[i].toString();

          let splitted = currentudk.split('.');

          return general.includes(splitted[0]);
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
            let currentudk = filtered[j].udk[k].toString().split('.');

            //checks if the current udk has that many "specific" parts
            if (currentudk[i]) {
              //if the current udk from filtered array includes the string add it to array (if it's not added yet)
              if (currentudk.includes(specificUDK) && !newestFiltered.includes(specificUDK)) {
                newestFiltered.push(currentudk[i]);
              }

              //if the specific Udk starts with a string after a dot and it matches one of the udks on the shelf from
              //the filtered array it gets added
              if (specificUDK.startsWith(currentudk[i]) && i != 0 && !newestFiltered.includes(currentudk[i])) {
                newestFiltered.push(currentudk[i]);
              }
            }
          }
        }
      }

      //makes the closest udk back into a specific udk string
      if (newestFiltered.length != 0) {
        for (let i = 0; i < newestFiltered.length; i++) {
          if (i != newestFiltered.length - 1) {
            closest += newestFiltered[i] + '.';
          } else {
            closest += newestFiltered[i];
          }
        }
      }

      setSelectedUDK(closest);
    }
  };
  if (selectedUDK == '') {
    getClosestUDK();
  } */
