import React from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useParams} from "react-router-dom";

const Library = () => {
    const location = useLocation();
    const {abbr} = useParams();

    return (
        <Link to={abbr ? "/add-floor-plan/room-editing" : "/add-floor-plan/22"} className="libraryLink">
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