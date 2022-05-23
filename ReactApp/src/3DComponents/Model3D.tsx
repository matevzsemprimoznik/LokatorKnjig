import React, {FC, memo} from "react";
import data from "../data.json";
import SelectedBookshelfPiece from "./SelectedBookshelfPiece";
import BookshelfPiece from "./BookshelfPiece";

interface BookShelfsProps {
    selectedUDK: string;
}
export const Model3D: FC<BookShelfsProps> = ({ selectedUDK }) => {
    return (
        <>
            {data.police.map((polica: any, index: number) =>
                polica.udk.includes(selectedUDK) ? (
                    <SelectedBookshelfPiece
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
                ) : (
                    <BookshelfPiece
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
