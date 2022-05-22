import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/landing_page/SearchForm.css';

const SearchForm = () => {
    const [searchedUDK, setSearchedUDK] = React.useState("");
    let history = useNavigate();

    const handleUDKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUDK(e.currentTarget.value);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let link = "/library-model/" + searchedUDK;
        history(link);
    }

    return (
        <div className="search-form">
            <div className="search-form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Išči po UDK..."
                        onChange={handleUDKChange}
                    />
                    <input type="submit" value="Išči"/>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;