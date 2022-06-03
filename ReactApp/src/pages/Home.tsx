import React, {useContext, useEffect} from 'react';
import Banner from '../components/landing_page/Banner';
import Footer from '../components/landing_page/Footer';
import LibrariesInfoSection from '../components/landing_page/LibrariesInfoSection';
import SearchForm from '../components/landing_page/SearchForm';
import {LibraryContext} from "../context/libraryContext";

const Home = () => {
    const {getLibraryData} = useContext(LibraryContext);

    useEffect(() => {
        getLibraryData();
    }, [])

    return (
        <>
            <div className='app-container'>
                <Banner/>
                <SearchForm/>
                <LibrariesInfoSection/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
