import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Input.css';
import search from '../assets/searchIcon.png';

type SearchUDKProps = {
    library ?: string;
}

const SearchUDK : FC<SearchUDKProps> = ({library}) => {
    const [searchedUDK, setSearchedUDK] = React.useState("");
    let navigate = useNavigate();

    const handleUDKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUDK(e.currentTarget.value);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let link = "/library-model/" + library + "?udk=" + searchedUDK;
        navigate(link);
    }

    return (
        <div className="udk-search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Išči po UDK..."
                    onChange={handleUDKChange}
                />
                <div className='search-icon' onClick={handleSubmit}>
                    <img src={search} alt="Search icon" style={{width: "35px", height: "35px"}}/>
                </div>
            </form>
        </div>
    );
};

export default SearchUDK;