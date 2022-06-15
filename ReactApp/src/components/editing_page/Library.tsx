import React, {FC, useEffect, useRef, useState} from 'react';
import '../../styles/editing_page/librarySelection_page/Library.css'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Modal from "../Modal";
import {libraryApi} from "../../context/axios";
import {ServerRoute} from "../../context/libraryContext"
import OpenIcon from '../../assets/2d-modeling_page/icons8-open-64.png';
import SaveIcon from '../../assets/2d-modeling_page/icons8-save-30.png';
import SquareButton from "../SquareButton";
import floorAndSpaces from "../../pages/FloorAndSpaces";

type LibraryPropsType = {
    section?: string,
    abbreviation?: string,
    hasNewData?: boolean,
    floor?: number,
    label?: string,
    abbr?: string,
    changeFloor?: Function,
    floorIndex?: number,
}

const Library: FC<LibraryPropsType> = ({floor, section, abbreviation, hasNewData, label, changeFloor, floorIndex}) => {
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
                <div className={(floor == floorIndex) ? "library-active" : "floors-spaces"}
                >
                    <div className="library__info" onClick={() => changeFloor!(floor)}>
                        <h2>Nadstropje {floor}</h2>
                        {(floor == floorIndex) && (
                            <SquareButton text={'Uredi'}
                                          style={{fontSize: '14px', padding: '6px 10px', marginRight: '0px'}}
                                          onClick={() => navigate(`/add-floor-plan/${abbreviation}/floor-editing/${floor}`)}/>
                        )}
                    </div>
                </div>
            ) : (label !== undefined && abbreviation) ? (
                <Link to={`/add-floor-plan/${abbreviation}/room-editing/${label}`} className="libraryLink">
                    <div className="floors-spaces">
                        <div className="library__info">
                            <h2>{label}</h2>
                        </div>
                    </div>
                </Link>
            ) : (

                <Link to={`/add-floor-plan/${abbreviation}`}
                      className="libraryLink">
                    <div className='library-container'>
                        <div className="library">
                            <div className="library__info1">
                                <div className="library__info-left">
                                    <h3>{section}</h3>
                                    <p>{abbreviation}</p>
                                </div>

                            </div>
                        </div>
                        <SquareButton disabled={hasNewData} text='Objavi knjižnico'
                                      onClick={() => saveToAllLibraries()}/>
                    </div>
                </Link>


            )}
        </>
    );
};

export default Library;