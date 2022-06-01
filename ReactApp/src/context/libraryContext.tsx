import { createContext, useEffect, useRef, useState } from 'react';
import {libraryApi} from "./axios";
import data from '../data.json'
import {Room} from "../models/library";


export type LibraryContextType = {
    floorData: Array<Room>;
    getFloorData: ((library: string, udk: string) => void) | null
};

export const LibraryContext = createContext<LibraryContextType>({
    floorData: [],
    getFloorData: null
});

const LibraryProvider = ({ children }: any) => {
    const [floorData, setFloorData] = useState<Array<Room>>([])

    const getFloorData = async (library: string, udk: string) => {
        try {
            console.log('sdkdfkjg')
            const response = await libraryApi.get(`/${library}/${udk}`);
            console.log(response)
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
