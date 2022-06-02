import { createContext, useEffect, useRef, useState } from 'react';
import {libraryApi} from "./axios";
import data from '../data.json'
import {Room} from "../models/library";


export type LibraryContextType = {
    floorData: Array<Room>;
    getFloorData: ((library: string, udk: string) => void)
    floors: Array<number>
    getAllFloors: (library: string) => void
    getSpecificFloorData: (library: string, floor: number) => void
};

export const LibraryContext = createContext<LibraryContextType>({
    floorData: [],
    getFloorData: () => {},
    getAllFloors: () => {},
    floors: [],
    getSpecificFloorData: () => {}
});

const LibraryProvider = ({ children }: any) => {
    const [floorData, setFloorData] = useState<Array<Room>>([])
    const [floors, setFloor] = useState<Array<number>>([])

    const getFloorData = async (library: string, udk: string) => {
        try {
            const response = await libraryApi.get(`udk/${library}/${udk}`);
            setFloorData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getAllFloors = async (library: string) => {
        try {
            const response = await libraryApi.get(`libraries/${library}/floors`);
            setFloor(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getSpecificFloorData = async (library: string, floor: number) => {
        try {
            const response = await libraryApi.get(`libraries/${library}/${floor}`);
            setFloorData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LibraryContext.Provider value={{floors, getAllFloors,getSpecificFloorData, floorData, getFloorData }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
