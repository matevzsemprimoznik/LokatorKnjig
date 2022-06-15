import React, {FC, useEffect, useRef, useState} from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Modal from "../Modal";
import {libraryApi} from "../../context/axios";
import {ServerRoute} from "../../context/libraryContext"
import OpenIcon from '../../assets/2d-modeling_page/icons8-open-64.png';
import SaveIcon from '../../assets/2d-modeling_page/icons8-save-30.png';

type LibraryPropsType = {
    section?: string,
    abbreviation?: string,
    desc?: string,
    floor?: number,
    label?: string,
    abbr?: string,
    changeFloor?: Function,
    floorIndex?: number,
}

const Library: FC<LibraryPropsType> = ({floor, section, abbreviation, desc, label, changeFloor, floorIndex}) => {
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const saveToAllLibraries = async () => {
        try {
            const response = await libraryApi.post(`${ServerRoute.EDITOR}/newLibrary/${abbreviation}`);
            console.log(response)

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}/>
            {(floor !== undefined && abbreviation) ? (
                <div className={(floor === floorIndex) ? "library-active" : "library"}
                >
                    <div className="library__info" onClick={() => changeFloor!(floor)}>
                        <h2>Nadstropje {floor}</h2>
                        {(floor === floorIndex) && (
                            <Link to={`/add-floor-plan/${abbreviation}/floor-editing/${floor}`} className="libraryLink">
                                <img src={OpenIcon} alt="Preglej nadstropje"/>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (label !== undefined && abbreviation) ? (
                <Link to={`/add-floor-plan/${abbreviation}/room-editing/${label}`} className="libraryLink">
                    <div className="library">
                        <div className="library__info">
                            <h2>{label}</h2>
                        </div>
                    </div>
                </Link>
            ) : (
                <div style={{display: "flex", alignItems: "center", marginLeft: "2em"}}>
                    <Link to={`/add-floor-plan/${abbreviation}`}
                          className="libraryLink" style={{width: "95%"}}>
                        <div className="library">
                            <div className="library__info1">
                                <div className="library__info-left">
                                    <h3>{section}</h3>
                                    <p>{abbreviation}</p>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <img src={SaveIcon} alt="Preglej nadstropje" onClick={() => saveToAllLibraries()}
                         style={{marginLeft: "auto", cursor: "pointer"}}/>
                </div>

            )}
        </>
    );
};

export default Library;