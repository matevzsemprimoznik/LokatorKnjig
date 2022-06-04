import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../styles/editing_page/librarySelection_page/LibrarySelectionPage.css'
import Library from "../components/editing_page/Library";
import Modal from "../components/Modal";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import libraryContext, {LibraryContext, LibraryContextType} from "../context/libraryContext";
import {libraryApi} from "../context/axios";

export type LibraryDataType = {
    section: string,
    abbreviation: string,
    desc: string
}

const LibrarySelectionPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<boolean>(false);
    const [floorIndex, setFloorIndex] = useState<number>(0)
    const {abbr} = useParams();
    const location = useLocation();
    const navigate = useNavigate();


    ref.current = location?.pathname?.match(/\//g)!.length > 1;

    const {
        getAllFloors,
        getSpecificFloorData,
        getLibraryData,
        section,
        floors,
        libraryData,
        floorData
    } = useContext(LibraryContext) as LibraryContextType;


    const saveLibraryInfo = async (library: LibraryDataType) => {
        try {
            await libraryApi.post(`libraries/`, library);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!ref.current) {
            getLibraryData();
        } else {
            getAllFloors(abbr!);
            getSpecificFloorData(abbr!, floorIndex);
        }

    }, [abbr, floorIndex]);


    const changeFloorIndex = (index: number) => {
        setFloorIndex(index);
    }


    return (
        <>
            <Modal open={open} onClose={() => setOpen(!open)} addLibrary={saveLibraryInfo}/>
            {!ref.current ? (
                <div className="libSelPage">
                    <div className="libSelPage_body">
                        <div className="libSelPage_body_container">
                            <h2>Vse knjižnice</h2>
                            <hr className="libSelPage_body_divider"/>
                            <div className="libSelPage_body_libraryCollection">
                                {libraryData?.map((library: LibraryDataType, index: number) => (
                                    <Library key={index} {...library}/>
                                ))}
                            </div>
                            <div className="libSelPageAdd" onClick={() => setOpen(true)}>
                                <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                                     className="libSelPageAddButton">
                                    <path fill="currentColor"
                                          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="libSelPage">
                    <div className="libSelPage_body">
                        <div className="libSelPage_body_container">
                            <div className="libSelPage_body_section">
                                <div className="libSelPage_body_element">
                                    <h2>Nadstropja</h2>
                                    <div className="libSelPage_body_libraryCollection">
                                        {floors?.map((floor: number, index: number) => (
                                            <Library floor={floor} key={index} abbreviation={abbr}
                                                     changeFloor={changeFloorIndex} floorIndex={floorIndex}/>
                                        ))}
                                    </div>
                                    <div className="libSelPageAdd" onClick={() => navigate(`floor-editing`)}>
                                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                                             className="libSelPageAddButton">
                                            <path fill="currentColor"
                                                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                        </svg>
                                    </div>
                                </div>
                                {/*<hr style={{borderBottom: "2px solid rgba(255, 255, 255, 0.3)", backgroundColor: "rgba(0, 0, 0, 0.5)", height: "85%", alignSelf: "center"}} />*/}
                                <div className="libSelPage_body_element">
                                    <h2>Prostori</h2>
                                    <div className="libSelPage_body_libraryCollection">
                                        {floorData?.map(({label}, index: number) => (
                                            <Library label={label} key={index} abbreviation={abbr}/>
                                        ))}
                                    </div>
                                    <div className="libSelPageAdd" onClick={() => setOpen(true)}>
                                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                                             className="libSelPageAddButton">
                                            <path fill="currentColor"
                                                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default LibrarySelectionPage;