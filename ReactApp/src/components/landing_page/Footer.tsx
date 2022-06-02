import React from 'react';
import '../../styles/landing_page/Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-info">
                        <div className="footer-title">
                            <h4>Lokator knjig</h4>
                            <Link to="/add-floor-plan" style={{color: 'white'}}>Dodajanje knjižnice</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;