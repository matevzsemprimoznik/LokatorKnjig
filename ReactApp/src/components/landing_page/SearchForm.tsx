import React from 'react';
import '../../styles/landing_page/SearchForm.css';

const SearchForm = () => {
    return (
        <div className="search-form">
            <div className="search-form-container">
                <form>
                    <input
                        type="text"
                        placeholder="Išči knjižnico..."
                    />
                    <input type="submit" value="Išči"/>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;