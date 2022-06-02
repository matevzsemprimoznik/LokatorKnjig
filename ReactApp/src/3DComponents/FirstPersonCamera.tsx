import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { ModelType } from '../context/modelContext';
import React, {FC, Ref, useContext, useEffect, useRef, useState} from 'react';
import { PerspectiveCameraProps, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { MathUtils, Quaternion, Vector3 } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import data from '../data.json';
import {LibraryContext} from "../context/libraryContext";

interface FirstPersonCameraProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
}
const FirstPersonCamera: FC<FirstPersonCameraProps> = ({ position }) => {
  const cameraRef = useRef<PerspectiveCameraProps>(null);
  const cameraRotation = new THREE.Euler(0, 0, 0, 'YXZ');
  const targetCameraPosition = useRef(new Vector3(position.x, position.y, position.z));
  const isDragEventOn = useRef(false);
  const isCameraMoving = useRef(false);
  const previousTouch = useRef<{ x: number; y: number } | null>(null);

  console.log(targetCameraPosition.current)

  const vector1 = {
    x: 0,
    z: -1,
  };
  const vector2 = {
    x: 0 - targetCameraPosition.current.x,
    z: 0 - targetCameraPosition.current.z,
  };

  const angle = Math.acos(
    (vector1.x * vector2.x + vector1.z * vector2.z) /
      (Math.sqrt(vector1.x * vector1.x + vector1.z * vector1.z) *
        Math.sqrt(vector2.x * vector2.x + vector2.z * vector2.z))
  );
  cameraRotation.y = angle * (targetCameraPosition.current.x < 0 ? -1 : 1);


  const onDrag = (event: MouseEvent | TouchEvent) => {
    isDragEventOn.current = true;
    if (cameraRef.current != null) {
      const minPolarAngle = 0;
      const _PI_2 = Math.PI / 2;
      const maxPolarAngle = Math.PI;

      const pointerSpeed = 1.0;
      let movementX = 0;
      let movementY = 0;
      if (event instanceof MouseEvent) {
        movementX = -(event.movementX || event.mozMovementX || event.webkitMovementX || 0);
        movementY = -(event.movementY || event.mozMovementY || event.webkitMovementY || 0);
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        if (previousTouch.current) {
          movementX = -(touch.pageX - previousTouch.current.x) || 0;
          movementY = -(touch.pageY - previousTouch.current.y) || 0;
        }
        previousTouch.current = { x: touch.pageX, y: touch.pageY };
      }

      cameraRotation.y -= movementX * 0.002 * pointerSpeed;

      cameraRotation.y -= movementX * 0.002 * pointerSpeed;
      cameraRotation.x -= movementY * 0.002 * pointerSpeed;
      cameraRotation.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, cameraRotation.x));
      if (cameraRef.current.quaternion != null && cameraRef.current.quaternion instanceof Quaternion)
        cameraRef.current.quaternion.setFromEuler(cameraRotation);
    }
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  let t = 0;
  let dt = 0.02;
  const moveCameraForward = (distance: number) => {
    if (isDragEventOn.current || isCameraMoving.current) return;

    if (cameraRef.current && cameraRef.current.position instanceof Vector3) {
      isCameraMoving.current = true;
      const cameraCurrentPosition = cameraRef.current.position;

      const delta = {
        x: Math.sin(cameraRotation.y % (2 * Math.PI)),
        z: Math.cos(cameraRotation.y % (2 * Math.PI)),
      };
      delta.x = (-Math.ceil(delta.x * 1000) / 1000) * distance;
      delta.z = (-Math.floor(delta.z * 1000) / 1000) * distance;

      targetCameraPosition.current = new THREE.Vector3(
        cameraCurrentPosition.x + delta.x,
        cameraCurrentPosition.y,
        cameraCurrentPosition.z + delta.z
      );
    }
  };

  const moveCamera = () => {
    if (cameraRef.current && cameraRef.current.position instanceof Vector3) {
      const cameraPosition = cameraRef.current.position;
      const newX = lerp(cameraPosition.x, targetCameraPosition.current.x, ease(t));
      const newY = lerp(cameraPosition.y, targetCameraPosition.current.y, ease(t));
      const newZ = lerp(cameraPosition.z, targetCameraPosition.current.z, ease(t));
      cameraRef.current.position.set(newX, newY, newZ);
      t += dt;
    }
  };

  useFrame(() => {
    if (cameraRef.current?.position && cameraRef.current.position instanceof Vector3) {
      if (!cameraRef.current.position.equals(targetCameraPosition.current)) {
        moveCamera();
      } else {
        isCameraMoving.current = false;
        t = 0;
        dt = 0.02;
      }
    }
  });

  useEffect(() => {
    const canvas = document.getElementById('canvas-container')?.getElementsByTagName('canvas')[0]
    if(canvas) {
      canvas.addEventListener('mousedown', () => {
        canvas.addEventListener('mousemove', onDrag);
      });
      canvas.addEventListener('mouseup', () => {
        if (!isDragEventOn.current) moveCameraForward(2);
        isDragEventOn.current = false;
        canvas.removeEventListener('mousemove', onDrag);
      });
      canvas.addEventListener('touchstart', () => {
        canvas.addEventListener('touchmove', onDrag);
      });
      canvas.addEventListener('touchend', () => {
        if (!isDragEventOn.current) moveCameraForward(2);
        isDragEventOn.current = false;
        previousTouch.current = null;
        canvas.removeEventListener('touchmove', onDrag);
      });
    }
  }, []);
  console.log(cameraRotation)
  return (
    <>
      <PerspectiveCamera
        rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
        makeDefault={true}
        ref={cameraRef}
        position={[position.x, position.y, position.z]}
        far={60}
      />
    </>
  );
};
export default FirstPersonCamera;
