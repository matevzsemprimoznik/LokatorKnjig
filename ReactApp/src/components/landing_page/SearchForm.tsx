import React, {useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/landing_page/SearchForm.css';
import {LibraryContext} from "../../context/libraryContext";
import DatalistInput, {Item} from "react-datalist-input";


const SearchForm = () => {
    const {libraryData} = useContext(LibraryContext);
    const [searchedUDK, setSearchedUDK] = React.useState("");
    const [library, setLibrary] = React.useState("");
    let navigate = useNavigate();

    const handleUDKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUDK(e.currentTarget.value);
    }
    const handleLibraryChange = (item: Item) => {
        setLibrary(item.value);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let link = "/library-model/" + library + "?udk=" + searchedUDK;
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

                    <DatalistInput
                        placeholder="Knjižnica"
                        label={null}
                        onSelect={handleLibraryChange}
                        items={libraryData.map((library: any) => {return {id: library.abbreviation, value: library.abbreviation}})}
                    />
                    <input type="submit" value="Išči" className='search-form-button'/>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;