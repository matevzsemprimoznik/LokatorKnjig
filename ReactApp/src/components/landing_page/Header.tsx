import { Link } from 'react-router-dom';
import '../../styles/landing_page/Header.css';


const Header = () => {
    return (
        <header>
        <div className="header">
            <nav>
                <div className="logo">
                    <Link to="/" style={{textDecoration: "none"}} >
                        <p>Lokator knjig</p>
                    </Link>
                    {/*TODO LINKI??*/}
                </div>
            </nav>
        </div>
        </header>
    );
};

export default Header;