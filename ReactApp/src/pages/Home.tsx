import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Banner from '../components/landing_page/Banner';
import EditSection from '../components/landing_page/EditSection';
import Footer from '../components/landing_page/Footer';
import Header from '../components/landing_page/Header';
import LibrariesInfoSection from '../components/landing_page/LibrariesInfoSection';
import SearchForm from '../components/landing_page/SearchForm';
import { libraryApi } from '../context/axios';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [libraryData, setLibraryData] = useState(null);

  const getLibraryData = async () => {
    try {
        const response = await libraryApi.get(`/libraries/all`);

        setLibraryData(response.data)
    } catch (err) {
        console.log(err);
    }
  }

    useEffect(() => {
        if(!libraryData)
            getLibraryData();
    }, [libraryData])

  return (
    <>
      <div className='app-container'>
        {/*<Header /> */}

          {libraryData ? (
              <>
                <Banner />
                <SearchForm libraries={libraryData}/>
                <LibrariesInfoSection libraries={libraryData} />
                <Footer />
              </>
          ) : null}

        {/*<EditSection />*/}

      </div>
    </>
  );
};

export default Home;
