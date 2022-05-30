import { FC } from "react";
import {DoubleSide, MeshBasicMaterial, PlaneGeometry } from "three";
import Text from './Text'

interface EntranceTextProps {
    position: {
        x: number;
        y: number;
        z: number;
    };
}

const EntranceText:FC<EntranceTextProps> = ({position}) => {
    const border1 = new PlaneGeometry(0.07, 0.58);
    const border2 = new PlaneGeometry(0.05, 1.47);
    const borderMaterial = new MeshBasicMaterial({ color: 'black', side: DoubleSide });

    return <>
        <mesh geometry={border1} material={borderMaterial} position={[position.x + 0.15, 0.08, position.z + 0.15]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={border1} material={borderMaterial} position={[position.x - 1.25, 0.08, position.z + 0.15]} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh geometry={border2} material={borderMaterial} position={[position.x - 0.55, 0.08, position.z + 0.44]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />

        <Text
            text={'VHOD'}
            size={0.3}
            color={'black'}
            position={position}
            rotation={{ x: -Math.PI / 2, y: 0, z: Math.PI }}
        />
    </>
}
export default EntranceText