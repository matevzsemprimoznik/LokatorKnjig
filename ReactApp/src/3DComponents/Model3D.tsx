import React, {FC, memo, useEffect, useRef, useState} from 'react';
import bookshelfGLB from '../assets/bookshelf.glb';
import closeBookshelfGLB from '../assets/closeBookshelf.glb';
import selectedBookshelfGLB from '../assets/selectedBookshelf.glb';
import Ground from './Ground';
import {ThreeEvent} from 'react-three-fiber';
import {Bookshelf, Position, Room} from '../models/library';
import Entrance from "./Entrance";
import {useGLTF} from "@react-three/drei";
import {BufferGeometry, BufferGeometryLoader, Matrix4} from "three";
import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils';
import {generateTextGeometry, size, textMaterial} from "../utils/textBuilder";


interface BookshelvesProps {
    selectedUDK: string;
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void;
    roomData: Room;
}

const Model3D: FC<BookshelvesProps> = ({selectedUDK, roomData, moveCameraToDoubleClickedPoint}) => {
    const {nodes: bookshelfNodes, materials: bookshelfMaterials}: any = useGLTF(bookshelfGLB);
    const {nodes: selectedBookshelfNodes, materials: selectedBookshelfMaterials}: any = useGLTF(selectedBookshelfGLB);
    const {nodes: closeBookshelfNodes, materials: closeBookshelfMaterials}: any = useGLTF(closeBookshelfGLB);
    const [bookshelvesGeometries, setBookshelvesGeometries] = useState<Array<{ geometry: any, material: any }>>([])

    const getSelectedUDKPositions = () => {
        const bookshelves = roomData.bookshelves.filter((bookshelf: Bookshelf, index: number) =>
            bookshelf.udks.some((udk: any) => udk.toString() === selectedUDK)
        );
        const positions: any = [];
        bookshelves.forEach((bookshelf: Bookshelf, index: number) => {
            if (
                index === 0 ||
                (index !== 0 &&
                    (bookshelf.position.x !== bookshelves[index - 1].position.x ||
                        bookshelf.position.z !== bookshelves[index - 1].position.z))
            )
                positions.push({x: bookshelf.position.x, z: bookshelf.position.z});
        });
        return positions;
    };
    const getNewBookshelfPositionsAccordingToAngle = (position: any, angle: number, roomCenter: Position) => {
        angle = (angle / 180) * Math.PI;
        const newPosition = {
            x: position.x * Math.cos(angle) + position.z * Math.sin(angle) + roomCenter.x,
            y: position.y + roomCenter.y,
            z: -position.x * Math.sin(angle) + position.z * Math.cos(angle) + roomCenter.z,
        };
        return newPosition;
    };

    const recalculateEntrancePosition = (position: Position, ground: Array<Position>) => {
        const difference = {
            x: ground.map(pos => position.x - pos.x),
            z: ground.map(pos => position.z - pos.z)
        }
        console.log(difference)
        return position
    }

    const selectedUDKPositions = getSelectedUDKPositions();

    useEffect(() => {
        const bookshelfGeometry = bookshelfNodes.Cube.geometry
        const closeBookshelfGeometry = bookshelfNodes.Cube.geometry
        const selectedBookshelfGeometry = bookshelfNodes.Cube.geometry

        const bookshelfGeometryIndex = 0
        const closeBookshelfGeometryIndex = 1
        const selectedBookshelfGeometryIndex = 2
        const textIndex = 3

        const initialReduceData = [
            {
                geometries: [] as BufferGeometry[],
                materials: bookshelfMaterials
            }
            ,
            {
                geometries: [] as BufferGeometry[],
                materials: closeBookshelfMaterials
            }
            ,
            {
                geometries: [] as BufferGeometry[],
                materials: selectedBookshelfMaterials
            },
            {
                geometries: [] as BufferGeometry[],
                materials: textMaterial
            },
        ]

        const bookshelves = roomData.bookshelves.reduce((array, bookshelf, index) => {
            let geometry = {
                type: bookshelfGeometry.clone(),
                index: bookshelfGeometryIndex
            }
            if (bookshelf.udks.some((udk: any) => udk.toString() === selectedUDK)) {
                geometry = {type: selectedBookshelfGeometry.clone(), index: selectedBookshelfGeometryIndex}
            } else if (selectedUDKPositions.some((position: any) => position.x === bookshelf.position.x && position.z === bookshelf.position.z)) {
                geometry = {type: closeBookshelfGeometry.clone(), index: closeBookshelfGeometryIndex}
            }


            const position = {
                ...getNewBookshelfPositionsAccordingToAngle(
                    {
                        x: bookshelf.position.x,
                        y: bookshelf.position.y,
                        z: bookshelf.position.z,
                    },
                    -roomData.rotation,
                    roomData.center
                ),
            }

            const translationMatrix = new Matrix4().makeTranslation(position.x / 20, position.y, position.z / 20)
            const rotationMatrix = new Matrix4().makeRotationY(((bookshelf.rotation + roomData.rotation) / 180) * Math.PI)

            geometry.type.applyMatrix4(rotationMatrix);
            geometry.type.applyMatrix4(translationMatrix);

            array[geometry.index].geometries = [geometry.type, ...array[geometry.index].geometries];

            if (bookshelf.udks && bookshelf.udks.length !== 0) {
                const textGeometry = generateTextGeometry(bookshelf.udks[0].toString())
                textGeometry.applyMatrix4(rotationMatrix)
                textGeometry.applyMatrix4(translationMatrix)

                array[textIndex].geometries = [textGeometry, ...array[textIndex].geometries]

            }
            return array;
        }, initialReduceData);
        const mergedBookshelves = bookshelves.flatMap(bookshelf => {
            if (bookshelf.geometries.length === 0)
                return []
            return [{
                geometry: mergeBufferGeometries(bookshelf.geometries, true),
                material: bookshelf.materials['CubeMaterial'] || textMaterial
            }]
        })
        setBookshelvesGeometries(mergedBookshelves)

    }, [roomData])


    return (
        <>
            {roomData.entrances.map((entrance, index) => (
                <Entrance
                    key={index}
                    rotation={entrance.rotation + roomData.rotation}
                    position={{
                        ...getNewBookshelfPositionsAccordingToAngle(
                            recalculateEntrancePosition(entrance.position, roomData.ground),
                            -roomData.rotation,
                            roomData.center
                        )
                    }}
                />
            ))}
            {bookshelvesGeometries && bookshelvesGeometries.map((bookshelfGeometry, index) => <mesh
                key={index}
                geometry={bookshelfGeometry.geometry}
                material={bookshelfGeometry.material}></mesh>
            )}


            <Ground
                position={{x: 0 + roomData.center.x, y: 0.05 + roomData.center.y, z: 0 + roomData.center.z}}
                onDoubleClick={moveCameraToDoubleClickedPoint}
                edges={roomData.ground}
                rotation={{x: 0, y: (-roomData.rotation / 180) * Math.PI, z: 0}}
            />
        </>
    );
};

export const MemoizedRoomModel = memo(Model3D);
