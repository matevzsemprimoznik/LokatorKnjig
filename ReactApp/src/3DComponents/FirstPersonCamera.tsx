import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {ModelType} from "../context/modelContext";
import React, {useEffect, useRef, useState} from "react";
import {PerspectiveCameraProps} from "react-three-fiber";
import * as THREE  from 'three'


const FirstPersonCamera = () => {
    const cameraRef = useRef<PerspectiveCameraProps>(null)
    const prevMouseRotationRef = useRef<{
        x: number,
        y: number
    }>()
    const [cameraRotation, setCameraRotation] = useState({x: 0, y: 0, z: 0})
    const _euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
    const onMouseMove = (event: MouseEvent) => {
        if(prevMouseRotationRef.current == null) {
            return prevMouseRotationRef.current = {x: event.clientX, y: event.clientY}
        }
        const delta = {
            x: event.clientX - prevMouseRotationRef.current.x,
            y: event.clientY - prevMouseRotationRef.current.y
        }

        if(cameraRef.current != null)
            {
                const minPolarAngle = 0;
                const _PI_2 = Math.PI / 2;
                const maxPolarAngle = Math.PI; // radians

                const pointerSpeed = 1.0;
                const movementX = -(event.movementX || event.mozMovementX || event.webkitMovementX || 0);
                const movementY = -(event.movementY || event.mozMovementY || event.webkitMovementY || 0);


                _euler.y -= movementX * 0.002 * pointerSpeed;
                _euler.x -= movementY * 0.002 * pointerSpeed;
                _euler.x = Math.max( _PI_2 -maxPolarAngle, Math.min( _PI_2 - minPolarAngle, _euler.x ) );
                // @ts-ignore
                cameraRef.current.quaternion.setFromEuler( _euler );

            }
        prevMouseRotationRef.current = {x: event.clientX, y: event.clientY}

    }
    useEffect(() => {
        document.addEventListener('mousedown',() => {
            document.addEventListener('mousemove', onMouseMove)
        })
        document.addEventListener('mouseup', () => {
            prevMouseRotationRef.current = undefined
            document.removeEventListener('mousemove', onMouseMove)
        })
    }, [])
    return <><PerspectiveCamera
        makeDefault={true}
        ref={cameraRef}
        position={[0,2,10]}
        far={60}
    />

    </>
}
export default FirstPersonCamera