import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landing_page/LibrariesInfoSection.css';

const LibrariesInfoSection = () => {
    let navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate("/library-model/");
    }


    return (
        <div className="libraries-info">
            <div className="libraries-info-container">
                <h2>Knjižnice v sistemu</h2>
                <p>Trenutno naša spletna stran omogoča pregled 1 knjižnice. 
                    Lahko si ogledate sam model knjižnice ali pa poiščete knjigo glede na njen UDK.
                    Spodaj je prikazanih nekaj knjižnic, ob kliku na kvadratek vas bo stran popeljala na 3D model izbrane 
                    knjižnice.
                </p>
                <div className="library-info-row">
                    <div className="col-md-4" onClick={handleNavigate}>
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">KTF</p>
                            </div>
                            <h3>Knjižnica tehniških fakultet</h3>
                            <p>
                                Knjižnica tehniških fakultet se nahaja na Smetanovi ulici 17. Je del 
                                Univerze v Mariboru. Odpiralni časi: 
                                PON-ČET: 7.30 - 16:30
                                PETEK: 7.30 - 14:30
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4" onClick={handleNavigate}>
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">KTF</p>
                            </div>
                            <h3>Knjižnica tehniških fakultet</h3>
                            <p>
                                Knjižnica tehniških fakultet se nahaja na Smetanovi ulici 17. Je del 
                                Univerze v Mariboru. Odpiralni časi: 
                                PON-ČET: 7.30 - 16:30
                                PETEK: 7.30 - 14:30
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4" onClick={handleNavigate}>
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">KTF</p>
                            </div>
                            <h3>Knjižnica tehniških fakultet</h3>
                            <p>
                                Knjižnica tehniških fakultet se nahaja na Smetanovi ulici 17. Je del 
                                Univerze v Mariboru. Odpiralni časi: 
                                PON-ČET: 7.30 - 16:30
                                PETEK: 7.30 - 14:30
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LibrariesInfoSection;