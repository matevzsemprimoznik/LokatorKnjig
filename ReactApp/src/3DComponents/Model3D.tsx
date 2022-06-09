import React, {FC, memo, useEffect, useRef} from 'react';
import BookshelfPiece from './BookshelfPiece';
import bookshelfGLB from '../assets/bookshelf.glb';
import closeBookshelf from '../assets/closeBookshelf.glb';
import selectedBookshelf from '../assets/selectedBookshelf.glb';
import Ground from './Ground';
import {ThreeEvent} from 'react-three-fiber';
import {Bookshelf, Position, Room} from '../models/library';
import EntranceText from './EntranceText';
import Entrance from "./Entrance";
import ground from "./Ground";

interface BookShelfsProps {
    selectedUDK: string;
    moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void;
    roomData: Room;
}

const Model3D: FC<BookShelfsProps> = ({selectedUDK, roomData, moveCameraToDoubleClickedPoint}) => {
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
            {roomData.bookshelves.map((bookshelf: Bookshelf, index: number) =>
                bookshelf.udks.some((udk: any) => udk.toString() === selectedUDK) ? (
                    <BookshelfPiece
                        type={selectedBookshelf}
                        key={index}
                        position={{
                            ...getNewBookshelfPositionsAccordingToAngle(
                                {
                                    x: bookshelf.position.x,
                                    y: bookshelf.position.y,
                                    z: bookshelf.position.z,
                                },
                                -roomData.rotation,
                                roomData.center
                            ),
                        }}
                        udk={bookshelf.udks}
                        rotation={{
                            x: 0,
                            y: ((bookshelf.rotation + roomData.rotation) / 180) * Math.PI,
                            z: 0,
                        }}
                    />
                ) : selectedUDKPositions.some(
                    (position: any) => position.x === bookshelf.position.x && position.z === bookshelf.position.z
                ) ? (
                    <BookshelfPiece
                        type={closeBookshelf}
                        key={index}
                        position={{
                            ...getNewBookshelfPositionsAccordingToAngle(
                                {
                                    x: bookshelf.position.x,
                                    y: bookshelf.position.y,
                                    z: bookshelf.position.z,
                                },
                                -roomData.rotation,
                                roomData.center
                            ),
                        }}
                        rotation={{
                            x: 0,
                            y: ((bookshelf.rotation + roomData.rotation) / 180) * Math.PI,
                            z: 0,
                        }}
                        udk={bookshelf.udks}
                    />
                ) : (
                    <BookshelfPiece
                        type={bookshelfGLB}
                        key={index}
                        position={{
                            ...getNewBookshelfPositionsAccordingToAngle(
                                {
                                    x: bookshelf.position.x,
                                    y: bookshelf.position.y,
                                    z: bookshelf.position.z,
                                },
                                -roomData.rotation,
                                roomData.center
                            ),
                        }}
                        rotation={{
                            x: 0,
                            y: ((bookshelf.rotation + roomData.rotation) / 180) * Math.PI,
                            z: 0,
                        }}
                        udk={bookshelf.udks}
                    />
                )
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
