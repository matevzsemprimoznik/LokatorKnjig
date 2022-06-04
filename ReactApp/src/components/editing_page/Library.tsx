import React, {FC, useEffect, useRef} from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useParams} from "react-router-dom";

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
    return (
        <>
            {(floor !== undefined && abbreviation) ? (
                <div className={(floor === floorIndex) ? "library-active" : "library"}
                     >
                    <div className="library__info" onClick={() => changeFloor!(floor)}>
                        <h2>Nadstropje {floor}</h2>
                        { (floor === floorIndex) && (
                            <Link to={`/add-floor-plan/${abbreviation}/floor-editing`} className="libraryLink">
                                <img src="../../icons8-open-64.png" alt="Preglej nadstropje"/>
                            </Link>
                        )}
                    </div>
                </div>
            ) : (label !== undefined && abbreviation) ? (
                <Link to={`/add-floor-plan/${abbreviation}/room-editing`} className="libraryLink">
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
                            <h2>{section}</h2>
                            <p>{abbreviation}</p>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Library;