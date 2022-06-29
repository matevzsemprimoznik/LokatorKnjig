import React, {FC, memo, useEffect, useRef, useState} from 'react';
import bookshelfGLB from '../assets/bookshelf.glb';
import closeBookshelfGLB from '../assets/closeBookshelf.glb';
import selectedBookshelfGLB from '../assets/selectedBookshelf.glb';
import Ground from './Ground';
import {ThreeEvent} from 'react-three-fiber';
import {Bookshelf, Position, Room} from '../models/library';
import Entrances from "./Entrances";
import {useGLTF} from "@react-three/drei";

import {
    BufferGeometry,
    InstancedMesh,
    Matrix4,
} from "three";
import {generateMatrixForSignGeometry, size, textGeometry, textMaterial} from "../utils/textBuilder";

interface BookshelvesProps {
    selectedUDK: string;
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void;
    roomData: Room;
}


const Model3D: FC<BookshelvesProps> = ({selectedUDK, roomData, moveCameraToDoubleClickedPoint}) => {
    const {nodes: bookshelfNodes, materials: bookshelfMaterials}: any = useGLTF(bookshelfGLB);
    const {nodes: selectedBookshelfNodes, materials: selectedBookshelfMaterials}: any = useGLTF(selectedBookshelfGLB);
    const {nodes: closeBookshelfNodes, materials: closeBookshelfMaterials}: any = useGLTF(closeBookshelfGLB);

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
    const getNewPositionAccordingToRotation = (position: Position, rotationAngle: number) => {
        rotationAngle = (rotationAngle / 180) * Math.PI;
        const newPosition = {
            x: position.x * Math.cos(rotationAngle) + position.z * Math.sin(rotationAngle),
            y: position.y,
            z: -position.x * Math.sin(rotationAngle) + position.z * Math.cos(rotationAngle),
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

    const [bookshelfMesh, setBookshelfMesh] = useState<InstancedMesh>()
    const [textMesh, setTextMesh] = useState<InstancedMesh>()

    useEffect(() => {
        const t0 = performance.now()

        let count = 0
        roomData.bookshelves.map((bookshelf, index) => {
            if (bookshelf.udks && bookshelf.udks.length !== 0) {
                const splittedText = bookshelf.udks[0].toString().split('')
                splittedText.map((sign, index2) => count += 7)
            }
        })
        const bookshelfInstanceMesh = new InstancedMesh(bookshelfNodes.Cube.geometry, bookshelfMaterials['CubeMaterial'], roomData.bookshelves.length)
        const textInstanceMesh = new InstancedMesh(textGeometry, textMaterial, count)


        let matrixPosition = 0
        roomData.bookshelves.map((bookshelf, index) => {
            const position = {
                x: (bookshelf.position.x + roomData.center.x) / 20,
                y: bookshelf.position.y,
                z: (bookshelf.position.z + roomData.center.z) / 20,
            }
            const bookshelfTranslationMatrix = new Matrix4().makeTranslation(position.x, position.y, position.z)
            const bookshelfRotationMatrix = new Matrix4().makeRotationY(bookshelf.rotation / 180 * Math.PI)
            const bookshelfMatrix = new Matrix4().multiplyMatrices(bookshelfTranslationMatrix, bookshelfRotationMatrix)

            bookshelfInstanceMesh.setMatrixAt(index, bookshelfMatrix)

            const translationMatrix = new Matrix4().makeTranslation(position.x, position.y, position.z)

            if (bookshelf.udks && bookshelf.udks.length !== 0) {
                const splittedText = bookshelf.udks[0].toString().split('')
                let offset = -(splittedText.length / 2 * (size.height * 1.4))

                splittedText.map((sign, index2) => {
                    const offsetMatrix = new Matrix4().makeTranslation(offset, 0, 0)

                    const matrix = generateMatrixForSignGeometry(sign)

                    matrix.map((textPieceMatrix: Matrix4, index3: number) => {
                        const multipliedOffsetAndTextPieceMatrix = offsetMatrix.clone().multiply(textPieceMatrix)
                        const rotatedMatrix = new Matrix4().makeRotationY(bookshelf.rotation / 180 * Math.PI).multiply(multipliedOffsetAndTextPieceMatrix)
                        const finalMatrix = translationMatrix.clone().multiply(rotatedMatrix)
                        textInstanceMesh.setMatrixAt(matrixPosition, finalMatrix)
                        matrixPosition++

                    })
                    offset += size.height * 1.4
                })

            }
        })

        setBookshelfMesh(bookshelfInstanceMesh)
        setTextMesh(textInstanceMesh)
    }, [roomData])


    return (
        <>
            {/* @ts-ignore*/}
            {bookshelfMesh && <instancedMesh {...bookshelfMesh} />}
            {/* @ts-ignore*/}
            {textMesh && <instancedMesh {...textMesh} />}

            <Entrances
                entrances={roomData.entrances}
                position={{x: roomData.center.x / 20, y: roomData.center.y / 20, z: roomData.center.z / 20,}}
            />


            {<Ground
                position={{x: 0 + roomData.center.x, y: 0.05 + roomData.center.y, z: 0 + roomData.center.z}}
                onDoubleClick={moveCameraToDoubleClickedPoint}
                edges={roomData.ground}
                rotation={{x: 0, y: (-roomData.rotation / 180) * Math.PI, z: 0}}
            />}
        </>
    );
};

export default Model3D
