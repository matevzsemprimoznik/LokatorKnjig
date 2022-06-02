import React from 'react';
import '../styles/editing_page/librarySelection_page/LibrarySelectionPage.css'
import Library from "../components/editing_page/Library";

const LibrarySelectionPage = () => {
    return (
        <div className="libSelPage">
            <div className="libSelPage_body">
                <div className="libSelPage_body_container">
                    <h2>Vse knjižnice</h2>
                    <hr className="libSelPage_body_divider"/>
                    <div className="libSelPage_body_libraryCollection">
                        <Library/>
                        <Library/>
                        <Library/>
                        <Library/>
                    </div>
                    <div className="libSelPageAdd">
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512"
                             className="libSelPageAddButton">
                            <path fill="currentColor"
                                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibrarySelectionPage;