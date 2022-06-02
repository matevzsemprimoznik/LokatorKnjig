import React, {FC} from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/landing_page/SearchForm.css';

type SearchFormProps = {
    libraries: any;
}

const SearchForm: FC<SearchFormProps> = ({libraries}) => {
    const [searchedUDK, setSearchedUDK] = React.useState("");
    const [library, setLibrary] = React.useState(libraries[0].abbreviation);
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
                        {   libraries ?
                                libraries.map((library: any) => (
                                    <option value={library.abbreviation}>
                                        {library.abbreviation}
                                    </option>
                                )) : null
                        }
                    </select>
                    <input type="submit" value="Išči"/>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;