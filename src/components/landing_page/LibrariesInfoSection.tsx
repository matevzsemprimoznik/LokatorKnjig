import React from 'react';
import '../../styles/landing_page/LibrariesInfoSection.css';

const LibrariesInfoSection = () => {
    return (
        <div className="libraries-info">
            <div className="libraries-info-container">
                <h2>Knjižnice v sistemu</h2>
                <p>
                    nek opis </p>
                <div className="library-info-row">
                    <div className="col-md-4">
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">UKM</p>
                            </div>
                            <h3>Naziv knjižnice</h3>
                            <p>
                                Opis knjižnice...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">UKM</p>
                            </div>
                            <h3>Naziv knjižnice</h3>
                            <p>
                                Opis knjižnice...
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="library-card">
                            <div className="icon">
                                <p className="library-alias">UKM</p>
                            </div>
                            <h3>Naziv knjižnice</h3>
                            <p>
                                Opis knjižnice...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LibrariesInfoSection;