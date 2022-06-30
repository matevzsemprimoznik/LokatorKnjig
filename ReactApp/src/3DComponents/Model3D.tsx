import React, {FC, useEffect, useMemo, useRef} from 'react';
import bookshelfGLB from '../assets/bookshelf.glb';
import closeBookshelfGLB from '../assets/closeBookshelf.glb';
import selectedBookshelfGLB from '../assets/selectedBookshelf.glb';
import Ground from './Ground';
import {ThreeEvent} from 'react-three-fiber';
import {Bookshelf, Position, Room} from '../models/library';
import Entrances from "./Entrances";
import {useGLTF} from "@react-three/drei";

import {InstancedMesh, Matrix4,} from "three";
import {generateMatrixForSignGeometry, size, textGeometry, textMaterial} from "../utils/textBuilder";

interface BookshelvesProps {
    selectedUDK: string;
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void;
    roomData: Room;
}


const Model3D: FC<BookshelvesProps> = ({selectedUDK, roomData, moveCameraToDoubleClickedPoint}) => {
    const bookshelfMeshRef = useRef<InstancedMesh | null>(null)
    const textMeshRef = useRef<InstancedMesh | null>(null)
    const closeBookshelfMeshRef = useRef<InstancedMesh | null>(null)
    const selectedBookshelfMeshRef = useRef<InstancedMesh | null>(null)
    const time = useRef(0)
    const {nodes: bookshelfNodes, materials: bookshelfMaterials}: any = useGLTF(bookshelfGLB);
    const {materials: selectedBookshelfMaterials}: any = useGLTF(selectedBookshelfGLB);
    const {materials: closeBookshelfMaterials}: any = useGLTF(closeBookshelfGLB);

    const getBookshelvesWithSelectedUdk = () => {
        return roomData.bookshelves.filter((bookshelf, index) =>
            bookshelf.udks.some((udk: string) => udk.toString() === selectedUDK)
        );
    }
    const getBookshelvesCloseToBookshelfWithSelectedUdk = (bookshelvesWithSelectedUdk: Bookshelf[]) => {
        return roomData.bookshelves.filter((bookshelf, index) => {
            if (bookshelf.udks.some((udk: string) => udk.toString() === selectedUDK))
                return false
            return bookshelvesWithSelectedUdk.some(bookshelfWithSelectedUdk => bookshelfWithSelectedUdk.position.x === bookshelf.position.x && bookshelfWithSelectedUdk.position.z === bookshelf.position.z)
        })
    }
    const getNormalBookshelves = (bookshelvesToRemove: Bookshelf[]) => {
        return roomData.bookshelves.filter((bookshelf, index) =>
            !bookshelvesToRemove.some(bookshelfToRemove => bookshelfToRemove.position.x === bookshelf.position.x && bookshelfToRemove.position.y === bookshelf.position.y && bookshelfToRemove.position.z === bookshelf.position.z)
        )
    }

    const getBookshelfMatrix = (bookshelf: Bookshelf) => {
        const position = {
            x: (bookshelf.position.x + roomData.center.x) / 20,
            y: bookshelf.position.y,
            z: (bookshelf.position.z + roomData.center.z) / 20,
        }
        const bookshelfTranslationMatrix = new Matrix4().makeTranslation(position.x, position.y, position.z)
        const bookshelfRotationMatrix = new Matrix4().makeRotationY(bookshelf.rotation / 180 * Math.PI)
        return new Matrix4().multiplyMatrices(bookshelfTranslationMatrix, bookshelfRotationMatrix)

    }
    const renderBookshelvesWithSelectedUdk = () => {
        const bookshelvesWithSelectedUdk = getBookshelvesWithSelectedUdk()
        if (selectedBookshelfMeshRef.current) {
            bookshelvesWithSelectedUdk.map((bookshelf, index) => {
                const bookshelfMatrix = getBookshelfMatrix(bookshelf)
                if (bookshelfMatrix && selectedBookshelfMeshRef.current)
                    selectedBookshelfMeshRef.current.setMatrixAt(index, bookshelfMatrix)
            })
            selectedBookshelfMeshRef.current.instanceMatrix.needsUpdate = true

        }
    }
    const renderBookshelvesCloseToBookshelfWithSelectedUdk = () => {
        const bookshelvesCloseToBookshelfWithSelectedUdk = getBookshelvesCloseToBookshelfWithSelectedUdk(getBookshelvesWithSelectedUdk())
        if (closeBookshelfMeshRef.current) {
            bookshelvesCloseToBookshelfWithSelectedUdk.map((bookshelf, index) => {
                const bookshelfMatrix = getBookshelfMatrix(bookshelf)
                if (bookshelfMatrix && closeBookshelfMeshRef.current)
                    closeBookshelfMeshRef.current.setMatrixAt(index, bookshelfMatrix)
            })
            closeBookshelfMeshRef.current.instanceMatrix.needsUpdate = true

        }
    }
    const renderNormalBookshelves = () => {
        if (bookshelfMeshRef.current) {
            normalBookshelves.map((bookshelf, index) => {
                const bookshelfMatrix = getBookshelfMatrix(bookshelf)
                if (bookshelfMatrix && bookshelfMeshRef.current)
                    bookshelfMeshRef.current.setMatrixAt(index, bookshelfMatrix)
            })
            bookshelfMeshRef.current.instanceMatrix.needsUpdate = true

        }
    }

    const renderUdks = () => {
        if (textMeshRef.current) {
            let textMeshRefPointer = 0
            roomData.bookshelves.map((bookshelf, index) => {
                const position = {
                    x: (bookshelf.position.x + roomData.center.x) / 20,
                    y: bookshelf.position.y,
                    z: (bookshelf.position.z + roomData.center.z) / 20,
                }
                const translationMatrix = new Matrix4().makeTranslation(position.x, position.y, position.z)
                if (bookshelf.udks && bookshelf.udks.length !== 0) {
                    const splittedText = bookshelf.udks[0].toString().split('')
                    let offset = -(splittedText.length / 2 * (size.height * 1.4))

                    splittedText.map((sign, index2) => {
                        const offsetMatrix = new Matrix4().makeTranslation(offset, 0, 0)

                        const matrix = generateMatrixForSignGeometry(sign)

                        matrix.map(textPieceMatrix => {
                            const multipliedOffsetAndTextPieceMatrix = offsetMatrix.clone().multiply(textPieceMatrix)
                            const rotatedMatrix = new Matrix4().makeRotationY(bookshelf.rotation / 180 * Math.PI).multiply(multipliedOffsetAndTextPieceMatrix)
                            const finalMatrix = translationMatrix.clone().multiply(rotatedMatrix)
                            if (textMeshRef.current)
                                textMeshRef.current.setMatrixAt(textMeshRefPointer, finalMatrix)
                            textMeshRefPointer++

                        })
                        offset += size.height * 1.4
                    })

                }
            })
            textMeshRef.current.instanceMatrix.needsUpdate = true

        }
    }

    const getNumberOfTextPieces = () => {
        return roomData.bookshelves.reduce((previousValue, bookshelf) => {
            let numberOfPiecesForOneUdk = 0
            if (bookshelf.udks && bookshelf.udks.length !== 0) {
                const splittedText = bookshelf.udks[0].toString().split('')
                numberOfPiecesForOneUdk = splittedText.length * 7
            }
            return previousValue + numberOfPiecesForOneUdk
        }, 0)
    }

    const bookshelvesWithSelectedUdk = useMemo(getBookshelvesWithSelectedUdk, []);
    const bookshelvesCloseToBookshelvesWithSelectedUdk = useMemo(() => getBookshelvesCloseToBookshelfWithSelectedUdk(bookshelvesWithSelectedUdk), []);
    const normalBookshelves = useMemo(() => getNormalBookshelves([...bookshelvesWithSelectedUdk, ...bookshelvesCloseToBookshelvesWithSelectedUdk]), [])
    const numberOfTextPieces = useMemo(getNumberOfTextPieces, [])

    useEffect(() => {
        renderNormalBookshelves()
        renderBookshelvesWithSelectedUdk()
        renderBookshelvesCloseToBookshelfWithSelectedUdk()
        renderUdks()
    }, [roomData])


    return (
        <>
            <instancedMesh ref={bookshelfMeshRef}
                           args={[bookshelfNodes.Cube.geometry, bookshelfMaterials['CubeMaterial'], normalBookshelves.length]}/>

            <instancedMesh ref={textMeshRef} args={[textGeometry, textMaterial, numberOfTextPieces]}/>
            <instancedMesh ref={closeBookshelfMeshRef}
                           args={[bookshelfNodes.Cube.geometry, closeBookshelfMaterials['CubeMaterial'], bookshelvesCloseToBookshelvesWithSelectedUdk.length]}/>
            <instancedMesh ref={selectedBookshelfMeshRef}
                           args={[bookshelfNodes.Cube.geometry, selectedBookshelfMaterials['CubeMaterial'], bookshelvesWithSelectedUdk.length]}/>
            <Entrances
                entrances={roomData.entrances}
                position={{x: roomData.center.x / 20, y: roomData.center.y / 20, z: roomData.center.z / 20}}
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
