import React, { FC, memo, useEffect, useRef } from 'react';
import data from '../data.json';
import BookshelfPiece from './BookshelfPiece';
import bookshelf from '../assets/bookshelf.glb';
import closeBookshelf from '../assets/closeBookshelf.glb';
import selectedBookshelf from '../assets/selectedBookshelf.glb';

interface BookShelfsProps {
  selectedUDK: string;
}
const Model3D: FC<BookShelfsProps> = ({ selectedUDK }) => {
  const getSelectedUDKPositions = () => {
    const bookshelves = data.police.filter((polica: any, index: number) =>
      polica.udk.some((udk: any) => udk.toString() === selectedUDK.toString())
    );
    const positions: any = [];
    bookshelves.forEach((bookshelf: any, index: number) => {
      if (
        index === 0 ||
        (index !== 0 &&
          (bookshelf.pozicija.x !== bookshelves[index - 1].pozicija.x ||
            bookshelf.pozicija.z !== bookshelves[index - 1].pozicija.z))
      )
        positions.push({ x: bookshelf.pozicija.x, z: bookshelf.pozicija.z });
    });
    return positions;
  };
  const selectedUDKPositions = getSelectedUDKPositions();
  return (
    <>
      {data.police.map((polica: any, index: number) =>
        polica.udk.some((udk: any) => udk.toString() === selectedUDK.toString()) ? (
          <BookshelfPiece
            type={selectedBookshelf}
            key={index}
            position={{
              x: polica.pozicija.x,
              y: polica.pozicija.y,
              z: polica.pozicija.z,
            }}
            udk={polica.udk}
            rotation={{
              x: 0,
              y: polica.rotacija === 0 ? 0 : Math.PI,
              z: 0,
            }}
          />
        ) : selectedUDKPositions.some(
            (position: any) => position.x === polica.pozicija.x && position.z === polica.pozicija.z
          ) ? (
          <BookshelfPiece
            type={closeBookshelf}
            key={index}
            position={{
              x: polica.pozicija.x,
              y: polica.pozicija.y,
              z: polica.pozicija.z,
            }}
            rotation={{
              x: 0,
              y: polica.rotacija === 0 ? 0 : Math.PI,
              z: 0,
            }}
            udk={polica.udk}
          />
        ) : (
          <BookshelfPiece
            type={bookshelf}
            key={index}
            position={{
              x: polica.pozicija.x,
              y: polica.pozicija.y,
              z: polica.pozicija.z,
            }}
            rotation={{
              x: 0,
              y: polica.rotacija === 0 ? 0 : Math.PI,
              z: 0,
            }}
            udk={polica.udk}
          />
        )
      )}
    </>
  );
};

export const MemoizedModel3D = memo(Model3D);
