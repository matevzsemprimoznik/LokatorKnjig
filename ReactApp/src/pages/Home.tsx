import React, { useState } from 'react';
import Banner from '../components/landing_page/Banner';
import EditSection from '../components/landing_page/EditSection';
import Footer from '../components/landing_page/Footer';
import Header from '../components/landing_page/Header';
import LibrariesInfoSection from '../components/landing_page/LibrariesInfoSection';
import SearchForm from '../components/landing_page/SearchForm';

const Home = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className='app-container'>
        <Header />
        <Banner />
        <SearchForm />
        <EditSection />
        <LibrariesInfoSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
