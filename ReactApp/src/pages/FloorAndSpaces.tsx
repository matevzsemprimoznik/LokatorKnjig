import BackButton from "../assets/2d-modeling_page/icons8-back-50.png";
import Library from "../components/editing_page/Library";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {LibraryContext, LibraryContextType, ServerRoute} from "../context/libraryContext";
import '../styles/editing_page/librarySelection_page/LibrarySelectionPage.css'
import {libraryApi} from "../context/axios";
import {LibraryDataType} from "./LibrarySelectionPage";
import Header from "../components/landing_page/Header";
import {Loading} from "../components/Loading";
import {AuthContext} from "../context/authContext";
import Button from "../components/Button";
import LeftArrowImage from "../assets/left-arrow.png";
import PlusImage from "../assets/plus.png";

const FloorAndSpaces = () => {
    const {isAuth} = useContext(AuthContext);
    const [floorIndex, setFloorIndex] = useState<number>(0);
    const {abbr} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        getSpecificFloorData,
        floorData,
        getFloorsAndSpaces,
        floorsAndSpaces
    } = useContext(LibraryContext) as LibraryContextType;


    useEffect(() => {
        if (abbr) {
            getSpecificFloorData(ServerRoute.EDITOR, abbr!, floorIndex);
            getFloorsAndSpaces(abbr!);
        }
    }, []);
    useEffect(() => {
        if (abbr && floorIndex)
            getSpecificFloorData(ServerRoute.EDITOR, abbr!, floorIndex);
    }, [floorIndex])

    useEffect(() => {
        if (floorsAndSpaces.floors && floorsAndSpaces.floors.length !== 0)
            setFloorIndex(floorsAndSpaces.floors[0])
    }, [floorsAndSpaces])

    const changeFloorIndex = (index: number) => {
        setFloorIndex(index);
    }

    const getFloorData = (libraryData: [], abbr: string) => {
        const library = libraryData?.filter((library: any) => library.abbreviation === abbr)[0] as any
        return library.floors
    }
    const getSpaceData = (floors: any, floorIndex: number) => {
        const floor = floors.filter((floor: any) => floor.label === floorIndex)[0] as any
        return floor.rooms
    }

    if (isAuth == null) return <><Header/><Loading/></>
    if (!isAuth) return <Navigate to='/login' replace state={{from: location}}/>;


    return <>
        <div className="libSelPage header" style={{minHeight: '650px'}}>
            <div className='libSelPage_header'>
                <Button onClick={() => navigate('/add-floor-plan')} image={LeftArrowImage}
                        style={{position: 'relative'}}/>
                <h2>Nadstropja in prostori</h2>
                <div></div>
            </div>
            <div className="libSelPage_body libSelPage_body_grid">
                <div className="libSelPage_body_libraryCollection">
                    {floorsAndSpaces.floors?.map((floor: number, index: number) => (
                        <Library floor={floor} key={index} abbreviation={abbr}
                                 changeFloor={changeFloorIndex} floorIndex={floorIndex}/>
                    ))}
                </div>
                <div className="libSelPage_body_libraryCollection">
                    {floorData?.map(({label}, index: number) => (
                        <Library label={label} key={index} abbreviation={abbr}/>
                    ))}
                </div>

            </div>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <div className="libSelPageAdd" onClick={() => navigate(`room-editing`)}>
                    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                         className="libSelPageAddButton">
                        <path fill="currentColor"
                              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                    </svg>
                </div>
            </div>
        </div>

    </>
}
export default FloorAndSpaces