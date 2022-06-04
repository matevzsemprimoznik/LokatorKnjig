import React, {FC, useEffect} from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useParams} from "react-router-dom";

type LibraryPropsType = {
    floor?: number,
}

const Library:FC<LibraryPropsType> = ({floor}) => {
    const location = useLocation();
    const {abbr} = useParams();



    return (
        <Link to={abbr ? "/add-floor-plan/room-editing" : "/add-floor-plan/KTF"} className="libraryLink">
        <div className="library">
            <div className="library__info">
                <h2>Section</h2>
                <p>Abbreviation</p>
            </div>
        </div>
        </Link>
    );
};

export default Library;