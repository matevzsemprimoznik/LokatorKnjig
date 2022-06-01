import { FC } from "react";
import {DoubleSide, MeshBasicMaterial, PlaneGeometry } from "three";
import Text from './Text'

interface EntranceTextProps {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: number
}

const EntranceText:FC<EntranceTextProps> = ({position, rotation}) => {
    const border1 = new PlaneGeometry(0.07, 0.58);
    const border2 = new PlaneGeometry(0.05, 1.47);
    const borderMaterial = new MeshBasicMaterial({ color: 'black', side: DoubleSide });

    return <mesh>
        <mesh geometry={border1} material={borderMaterial} position={[position.x + 0.15, 0.08, position.z + 0.15]} rotation={[-Math.PI / 2, rotation / 180 * Math.PI, 0]} />
        <mesh geometry={border1} material={borderMaterial} position={[position.x - 1.25, 0.08, position.z + 0.15]} rotation={[-Math.PI / 2, rotation / 180 * Math.PI, 0]} />
        <mesh geometry={border2} material={borderMaterial} position={[position.x - 0.55, 0.08, rotation===180 ? position.z - 0.18 : position.z + 0.44]} rotation={[-Math.PI / 2, rotation / 180 * Math.PI, Math.PI / 2]} />

        <Text
            text={'VHOD'}
            size={0.3}
            color={'black'}
            position={rotation === 180 ? {...position, x: position.x - 1.1 } : position}
            rotation={{ x: -Math.PI / 2, y: rotation / 180 * Math.PI, z: Math.PI }}
        />
    </mesh>
}
export default EntranceText