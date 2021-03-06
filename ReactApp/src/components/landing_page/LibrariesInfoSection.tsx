import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landing_page/LibrariesInfoSection.css';
import {LibraryContext} from "../../context/libraryContext";

const LibrariesInfoSection = () => {
    const {libraryData} = useContext(LibraryContext);
    let navigate = useNavigate();
    
    const handleNavigate = (abbreviation: any) => {
        let link = "/library-model/"+abbreviation;
        navigate(link);
    }


    return (
        <div className="libraries-info">
            <div className="libraries-info-container">
                <h2>Knjižnice v sistemu</h2>
                <p>Trenutno naša spletna stran omogoča pregled {libraryData.length} knjižnic.
                    Lahko si ogledate sam model knjižnice ali pa poiščete knjigo glede na njen UDK.
                    Spodaj je prikazanih nekaj knjižnic, ob kliku na kvadratek vas bo stran popeljala na 3D model izbrane 
                    knjižnice.
                </p>
                <div className="library-info-row">
                {
                    libraryData.filter((library, index) => index <3).map((library: any, index: number) => (
                        <div key={index} className="col-md-4" onClick={() => handleNavigate(library.abbreviation)}>
                            <div className="library-card">
                                <div className="icon">
                                    <p className="library-alias">{library.abbreviation}</p>
                                </div>
                                <h3>{library.section}</h3>
                                <p>
                                    {library.desc}
                                </p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};
export default LibrariesInfoSection;