import React, {FC, useEffect, useRef, useState} from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useParams} from "react-router-dom";
import Modal from "../Modal";

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
                                <img src="../../icons8-open-64.png" alt="Preglej nadstropje"/>
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
                <Link to={`/add-floor-plan/${abbreviation}`}
                      className="libraryLink">
                    <div className="library">
                        <div className="library__info1">
                            <div className="library__info-left">
                                <h3>{section}</h3>
                                <p>{abbreviation}</p>
                            </div>
                            <img src="../../icons8-save-30.png" alt="Preglej nadstropje" onClick={() => setOpen(true)} />
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Library;