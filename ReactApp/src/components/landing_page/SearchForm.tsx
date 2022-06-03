import React, {useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/landing_page/SearchForm.css';
import {LibraryContext} from "../../context/libraryContext";


const SearchForm = () => {
    const {libraryData} = useContext(LibraryContext);
    const [searchedUDK, setSearchedUDK] = React.useState("");
    const [library, setLibrary] = React.useState("");
    let navigate = useNavigate();

    const handleUDKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUDK(e.currentTarget.value);
    }
    const handleLibraryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLibrary(e.target.value);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let link = "/library-model/" + library + "/" + searchedUDK;
        navigate(link);
    }

    useEffect(() => {
        if (libraryData.length != 0) {
            setLibrary(libraryData[0].abbreviation);
        }
    }, [libraryData])

    return (
        <div className="search-form">
            <div className="search-form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Išči po UDK..."
                        onChange={handleUDKChange}
                    />
                    <select
                        className="library-select"
                        onChange={handleLibraryChange}>
                        {   libraryData.map((library: any, index: number) => (
                                    <option key={index} value={library.abbreviation}>
                                        {library.abbreviation}
                                    </option>
                                ))
                        }
                    </select>
                    <input type="submit" value="Išči"/>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;