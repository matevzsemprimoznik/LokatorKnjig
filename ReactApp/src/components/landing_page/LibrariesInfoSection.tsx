import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landing_page/LibrariesInfoSection.css';

type LibrariesInfoProps = {
    libraries: any;
}

const LibrariesInfoSection: FC<LibrariesInfoProps> = ({libraries}) => {
    let navigate = useNavigate();
    
    const handleNavigate = (abbreviation: any) => {
        let link = "/library-model/"+abbreviation;
        navigate(link);
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
                {
                    libraries.map((library: any) => (
                        <div className="col-md-4" onClick={() => handleNavigate(library.abbreviation)}>
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