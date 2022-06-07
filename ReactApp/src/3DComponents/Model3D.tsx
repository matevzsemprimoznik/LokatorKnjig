import React, { FC, memo, useEffect, useRef } from 'react';
import BookshelfPiece from './BookshelfPiece';
import bookshelfGLB from '../assets/bookshelf.glb';
import closeBookshelf from '../assets/closeBookshelf.glb';
import selectedBookshelf from '../assets/selectedBookshelf.glb';
import Ground from "./Ground";
import {ThreeEvent} from "react-three-fiber";
import {Bookshelf, Room} from "../models/library";
import EntranceText from "./EntranceText";

interface BookShelfsProps {
  selectedUDK: string;
  moveCameraToDoubleClickedPoint: (event: ThreeEvent<MouseEvent>) => void
  roomData: Room
}
const Model3D: FC<BookShelfsProps> = ({ selectedUDK,roomData,moveCameraToDoubleClickedPoint }) => {
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
        positions.push({ x: bookshelf.position.x, z: bookshelf.position.z });
    });
    return positions;
  };
  const selectedUDKPositions = getSelectedUDKPositions();
  return (
    <>
      {roomData.entrances.map((entrance,index) => <EntranceText key={index} rotation={entrance.rotation} position={{ x: entrance.position.x + roomData.center.x,y: entrance.position.y + roomData.center.y,z: entrance.position.z + roomData.center.z  }} />)}
      {roomData.bookshelves.map((bookshelf: Bookshelf, index: number) =>
          bookshelf.udks.some((udk: any) => udk.toString() === selectedUDK) ? (
          <BookshelfPiece
            type={selectedBookshelf}
            key={index}
            position={{
              x: bookshelf.position.x + roomData.center.x,
              y: bookshelf.position.y + roomData.center.y,
              z: bookshelf.position.z + roomData.center.z,
            }}
            udk={bookshelf.udks}
            rotation={{
              x: 0,
              y: bookshelf.rotation / 180 * Math.PI,
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
              x: bookshelf.position.x + roomData.center.x,
              y: bookshelf.position.y + roomData.center.y,
              z: bookshelf.position.z + roomData.center.z,
            }}
            rotation={{
              x: 0,
              y: bookshelf.rotation / 180 * Math.PI,
              z: 0,
            }}
            udk={bookshelf.udks}
          />
        ) : (
          <BookshelfPiece
            type={bookshelfGLB}
            key={index}
            position={{
              x: bookshelf.position.x + roomData.center.x,
              y: bookshelf.position.y + roomData.center.y,
              z: bookshelf.position.z + roomData.center.z,
            }}
            rotation={{
              x: 0,
              y: bookshelf.rotation / 180 * Math.PI,
              z: 0,
            }}
            udk={bookshelf.udks}
          />
        )
      )}
      <Ground position={{ x: 0 + roomData.center.x, y: 0.05+ roomData.center.y, z: 0+ roomData.center.z }} onDoubleClick={moveCameraToDoubleClickedPoint} edges={roomData.ground} />
    </>
  );
};

export const MemoizedRoomModel = memo(Model3D);
