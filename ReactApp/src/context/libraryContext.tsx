import { createContext, useState } from 'react';
import {libraryApi} from "./axios";
import {Room} from "../models/library";


export type LibraryContextType = {
    floorData: Array<Room>;
    getFloorData: ((library: string, udk: string) => void)
    floors: Array<number>
    getAllFloors: (library: string) => void
    getSpecificFloorData: (library: string, floor: number) => void
    getLibraryData: () => void
    libraryData: Array<any>
    section: string
};

export const LibraryContext = createContext<LibraryContextType>({
    floorData: [],
    getFloorData: () => {},
    getAllFloors: () => {},
    floors: [],
    getSpecificFloorData: () => {},
    getLibraryData: () => {},
    libraryData: [],
    section: ""
});

const LibraryProvider = ({ children }: any) => {
    const [libraryData, setLibraryData] = useState([]);
    const [floorData, setFloorData] = useState<Array<Room>>([])
    const [floors, setFloor] = useState<Array<number>>([])
    const [section, setSection] = useState<string>("");

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
            const response = await libraryApi.get(`libraries/${library}/floors`)
            setSection(response.data.section)
            setFloor(response.data.floors)
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

    const getLibraryData = async () => {
        try {
            const response = await libraryApi.get(`/libraries/`);
            setLibraryData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LibraryContext.Provider value={{floors, getAllFloors,getSpecificFloorData, floorData, getFloorData, getLibraryData, libraryData, section }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
