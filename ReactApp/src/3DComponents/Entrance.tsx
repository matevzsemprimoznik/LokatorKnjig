import {FC} from "react";
import {BackSide, BoxGeometry, MeshBasicMaterial} from "three";

interface EntranceProps {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: number
}
const Entrance:FC<EntranceProps> = ({position, rotation}) => {
        return  <mesh geometry={new BoxGeometry(2.5, 0.2, 0)} material={new MeshBasicMaterial({color: '#0073d3'})} position={[position.x, 0.01, position.z - 0.1]} rotation={[-Math.PI / 2, rotation / 180 * Math.PI, 0]} />

}
export default Entrance