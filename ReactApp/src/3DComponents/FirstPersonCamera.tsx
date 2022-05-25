import { OrbitControls, OrbitControlsProps, PerspectiveCamera } from '@react-three/drei';
import { ModelType } from '../context/modelContext';
import React, { FC, Ref, useEffect, useRef, useState } from 'react';
import { PerspectiveCameraProps, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { MathUtils, Quaternion, Vector3 } from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface FirstPersonCameraProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
}
const FirstPersonCamera: FC<FirstPersonCameraProps> = ({ position = { x: 0, y: 2, z: 10 } }) => {
  const cameraRef = useRef<PerspectiveCameraProps>(null);
  const _euler = new THREE.Euler(0, 0, 0, 'YXZ');
  const targetCameraPosition = useRef(new Vector3(position.x, position.y, position.z));
  const cameraRotationOnYAxis = useRef(0);
  const isDragEventOn = useRef(false);
  const isCameraMoving = useRef(false);

  const onMouseMove = (event: MouseEvent) => {
    isDragEventOn.current = true;
    if (cameraRef.current != null) {
      const minPolarAngle = 0;
      const _PI_2 = Math.PI / 2;
      const maxPolarAngle = Math.PI;

      const pointerSpeed = 1.0;
      const movementX = -(event.movementX || event.mozMovementX || event.webkitMovementX || 0);
      const movementY = -(event.movementY || event.mozMovementY || event.webkitMovementY || 0);

      cameraRotationOnYAxis.current -= movementX * 0.002 * pointerSpeed;

      _euler.y -= movementX * 0.002 * pointerSpeed;
      _euler.x -= movementY * 0.002 * pointerSpeed;
      _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x));
      if (cameraRef.current.quaternion != null && cameraRef.current.quaternion instanceof Quaternion)
        cameraRef.current.quaternion.setFromEuler(_euler);
    }
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  let t = 0;
  let dt = 0.02;
  const moveCameraForward = (distance: number) => {
    if (isDragEventOn.current || isCameraMoving.current) return (isDragEventOn.current = false);

    if (cameraRef.current && cameraRef.current.position instanceof Vector3) {
      isCameraMoving.current = true;
      const cameraCurrentPosition = cameraRef.current.position;

      const delta = {
        x: Math.sin(cameraRotationOnYAxis.current % (2 * Math.PI)),
        z: Math.cos(cameraRotationOnYAxis.current % (2 * Math.PI)),
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

  const loop = () => {
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
        loop();
      } else {
        isCameraMoving.current = false;
        t = 0;
        dt = 0.02;
      }
    }
  });

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', onMouseMove);
    });
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
    document.addEventListener('click', () => moveCameraForward(2));
    document.addEventListener('dblclick', () => moveCameraForward(4));
  }, []);
  return (
    <>
      <PerspectiveCamera makeDefault={true} ref={cameraRef} position={[position.x, position.y, position.z]} far={60} />
    </>
  );
};
export default FirstPersonCamera;
