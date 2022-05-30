import { createContext, useEffect, useRef, useState } from 'react';
import {libraryApi} from "./axios";
import data from '../data.json'
import {Room} from "../models/library";


export type LibraryContextType = {
    floorData: Array<Room>;
    getFloorData: (library: string, udk: string) => void
};

export const LibraryContext = createContext<LibraryContextType>({
    floorData: [],
    getFloorData: () => {}
});

const LibraryProvider = ({ children }: any) => {
    const [floorData, setFloorData] = useState<Array<Room>>([])

    const getFloorData = async (library: string, udk: string) => {
        try {
            const response = await libraryApi.get(`/${library}/${udk}`);
            setFloorData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LibraryContext.Provider value={{ floorData, getFloorData }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
