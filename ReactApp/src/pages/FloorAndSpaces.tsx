import BackButton from "../assets/2d-modeling_page/icons8-back-50.png";
import Library from "../components/editing_page/Library";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {LibraryContext, LibraryContextType, ServerRoute} from "../context/libraryContext";
import {libraryApi} from "../context/axios";
import {LibraryDataType} from "./LibrarySelectionPage";
import Header from "../components/landing_page/Header";
import {Loading} from "../components/Loading";
import {AuthContext} from "../context/authContext";

const FloorAndSpaces = () => {
    const {isAuth} = useContext(AuthContext);
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<boolean>(false);
    const [floorIndex, setFloorIndex] = useState<number>(0);
    const {abbr} = useParams();
    const location = useLocation();
    const navigate = useNavigate();


    ref.current = location?.pathname?.match(/\//g)!.length > 1;

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


    const changeFloorIndex = (index: number) => {
        setFloorIndex(index);
    }

    if (isAuth == null) return <><Header/><Loading/></>
    if (!isAuth) return <Navigate to='/login' replace state={{from: location}}/>;

    return <div className="libSelPage">
        <div className="libSelPage_body">
            <div className="libSelPage_body_container">
                <div className="libSelPage_body_section">
                    <div className="libSelPage_body_element">
                        <div className="backButton" onClick={() => navigate('/add-floor-plan')}><img
                            src={BackButton}
                            alt="back"/></div>
                        <h2 style={{marginTop: "-27px"}}>Nadstropja</h2>
                        <div className="libSelPage_body_libraryCollection">
                            {floorsAndSpaces.floors?.map((floor: number, index: number) => (
                                <Library floor={floor} key={index} abbreviation={abbr}
                                         changeFloor={changeFloorIndex} floorIndex={floorIndex}/>
                            ))}
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
                        <div className="libSelPageAdd" onClick={() => navigate(`room-editing`)}>
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
}
export default FloorAndSpaces