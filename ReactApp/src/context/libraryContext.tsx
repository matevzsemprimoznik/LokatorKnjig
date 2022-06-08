import {createContext, useState} from 'react';
import {libraryApi} from "./axios";
import {Room} from "../models/library";


export type LibraryContextType = {
    floorData: Array<Room>;
    getFloorData: ((library: string, udk: string) => void)
    floors: Array<number>
    getAllFloors: (serverRoute: ServerRoute, library: string) => void
    getSpecificFloorData: (serverRoute: ServerRoute, library: string, floor: number) => void
    getLibraryData: (serverRoute: ServerRoute) => void
    libraryData: Array<any>
    section: string
    getFloorsAndSpaces: (abbr: string) => void,
    floorsAndSpaces: any,
    svgs: Array<any>
    getSvgs: (library: string, floor: string) => void
    setFloorData: any
};

export enum ServerRoute {
    LIBRARIES = 'libraries',
    EDITOR = 'editor',
}

export const LibraryContext = createContext<LibraryContextType>({
    svgs: [],
    getSvgs: () => {
    },
    floorData: [],
    setFloorData: () => {
    },
    getFloorData: () => {
    },
    getAllFloors: () => {
    },
    floors: [],
    getSpecificFloorData: () => {
    },
    getLibraryData: () => {
    },
    libraryData: [],
    getFloorsAndSpaces: (abbr: string) => {
    },
    section: "",
    floorsAndSpaces: [],
});

const LibraryProvider = ({children}: any) => {
    const [libraryData, setLibraryData] = useState([]);
    const [floorData, setFloorData] = useState<Array<Room>>([])
    const [floors, setFloor] = useState<Array<number>>([])
    const [section, setSection] = useState<string>("");
    const [floorsAndSpaces, setFloorAndSpaces] = useState([]);
    const [svgs, setSvgs] = useState([])

    const getSvgs = async (library: string, floor: string) => {
        try {
            const response = await libraryApi.get(`editor/${library}/${floor}`);
            setSvgs(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getFloorData = async (library: string, udk: string) => {
        try {
            const response = await libraryApi.get(`udk/${library}/${udk}`);
            setFloorData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getAllFloors = async (serverRoute: ServerRoute, library: string) => {
        try {
            const response = await libraryApi.get(`${serverRoute}/${library}/floors`)
            setSection(response.data.section)
            setFloor(response.data.floors)
        } catch (err) {
            console.log(err);
        }
    }

    const getSpecificFloorData = async (serverRoute: ServerRoute, library: string, floor: number) => {
        try {
            const response = await libraryApi.get(`${serverRoute}/${library}/${floor}`);
            setFloorData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getLibraryData = async (serverRoute: ServerRoute) => {
        try {
            const response = await libraryApi.get(`/${serverRoute}/`);
            setLibraryData(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getFloorsAndSpaces = async (abbr: string) => {
        try {
            const response = await libraryApi.get(`/editor/${abbr}/floors-and-spaces`);
            setFloorAndSpaces(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LibraryContext.Provider value={{
            setFloorData,
            floors,
            getAllFloors,
            getSpecificFloorData,
            floorData,
            getFloorData,
            getLibraryData,
            libraryData,
            section,
            getFloorsAndSpaces,
            floorsAndSpaces,
            svgs,
            getSvgs
        }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
