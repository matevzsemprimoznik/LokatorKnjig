import React from 'react';
import '../../styles/landing_page/Banner.css';

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-container">
                <div className="banner-row">
                    <div className="banner-desc">
                        <h2 className="banner-title">Lokator knjig je rešitev, s katero lahko oseba v knjižnici lažje najde želeno knjigo</h2>
                        <p className="banner-text">
                            Lokator knjig je projekt/rešitev, s katero lahko oseba v knjižnici lažje najde svojo želeno knjigo. Knjigo najdete s pomočjo njenega UDK (Univerzalna Decimalna Klasifikacija). Uporabniku se nato prikaže grafični prikaz izbrane knjižnice, kjer je označena približna lokacija knjige.
                        </p>
                    </div>
                    <div className="banner-image">
                        <img src="../images/undraw_bookshelves_re_lxoy.svg" alt="illustration"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;