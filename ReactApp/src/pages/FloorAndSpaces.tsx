import BackButton from "../assets/2d-modeling_page/icons8-back-50.png";
import Library from "../components/editing_page/Library";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {LibraryContext, LibraryContextType, ServerRoute} from "../context/libraryContext";
import '../styles/editing_page/librarySelection_page/LibrarySelectionPage.css'
import {fetcher, libraryApi} from "../context/axios";
import {LibraryDataType} from "./LibrarySelectionPage";
import Header from "../components/landing_page/Header";
import {Loading} from "../components/Loading";
import {AuthContext} from "../context/authContext";
import Button from "../components/Button";
import LeftArrowImage from "../assets/left-arrow.png";
import PlusImage from "../assets/plus.png";
import useSWR from "swr";
import {Room} from "../models/library";

const FloorAndSpaces = () => {
    const {isAuth} = useContext(AuthContext);
    const [floorIndex, setFloorIndex] = useState<number>(0);
    const {abbr} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {data} = useSWR(`/editor/allLibraries`, fetcher)
    const [spaces, setSpaces] = useState([]);
    const [floors, setFloors] = useState([])

    useEffect(() => {
        if (data && abbr) {
            const floors = parseFloorData(data, abbr)
            setFloors(floors)
            if (floors.length !== 0) {
                const spaces = parseSpaceData(floors, floors[0].label)
                setSpaces(spaces)
                setFloorIndex(floors[0].label)
            }
        }
    }, [data])
    useEffect(() => {
        if (abbr && floorIndex)
            setSpaces(parseSpaceData(floors, floorIndex))
    }, [floorIndex])


    const changeFloorIndex = (index: number) => {
        setFloorIndex(index);
    }

    const parseFloorData = (libraryData: [], abbr: string) => {
        const library = libraryData?.filter((library: any) => library.abbreviation === abbr)[0] as any
        return library.floors
    }
    const parseSpaceData = (floors: any, floorIndex: number) => {
        const floor = floors.filter((floor: any) => floor.label === floorIndex)[0] as any
        return floor.rooms
    }

    if (isAuth == null) return <><Header/><Loading/></>
    if (!isAuth) return <Navigate to='/login' replace state={{from: location}}/>;


    return <>
        <div className="libSelPage header" style={{minHeight: '650px'}}>
            <div className='libSelPage_header'>
                <Button onClick={() => navigate('/add-floor-plan')} image={LeftArrowImage}
                        style={{position: 'relative', width: '3.5rem', height: '3.5rem'}}/>
                <h2>Nadstropja in prostori</h2>
                <div></div>
            </div>
            <div className="libSelPage_body libSelPage_body_grid">
                {spaces.length !== 0 ? <div className="libSelPage_body_libraryCollection">
                    {floors.map((floor: any, index: number) => (
                        <Library floor={floor.label} key={index} abbreviation={abbr}
                                 changeFloor={changeFloorIndex} floorIndex={floorIndex}/>
                    ))}
                </div> : <p style={{textAlign: "center"}}>Ta knjižnica nima nadstropij</p>}
                {spaces.length !== 0 ? <div className="libSelPage_body_libraryCollection">
                    {spaces.map((space: any, index: number) => (
                        <Library label={space} key={index} abbreviation={abbr}/>
                    ))}
                </div> : <p style={{textAlign: "center"}}>Ta knjižnica nima prostorov</p>}

            </div>
            <div style={{display: 'flex', justifyContent: 'end'}}>


                <Button onClick={() => navigate(`room-editing`)} image={PlusImage}
                        style={{position: 'relative', width: '3.5rem', height: '3.5rem'}}/>


            </div>
        </div>

    </>
}
export default FloorAndSpaces