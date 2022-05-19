import Grid from './components/Grid';
import Model from './pages/Model';
import {Controls, useControl} from 'react-three-gui';
import {Canvas} from 'react-three-fiber';
import Button from "./components/Button";
import {useLayoutEffect, useState} from "react";
import Drawer from "./components/Drawer";
import MenuProvider from "./context/menuContext";
import Header from './components/landing_page/Header';
import Banner from "./components/landing_page/Banner";
import Footer from './components/landing_page/Footer';
import EditSection from './components/landing_page/EditSection';
import LibrariesInfoSection from './components/landing_page/LibrariesInfoSection';
import SearchForm from './components/landing_page/SearchForm';
import './index.css';


function App() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);


    // <>
    //     <MenuProvider>
    //         <Button image="../menu-button.svg" position={{top: 2, left: 2}}/>
    //         <Drawer/>
    //     </MenuProvider>
    //     <div className="app_canvas">
    //         <Canvas camera={{position: [0, 5, 10], fov: 60}}>
    //             <Model/>
    //         </Canvas>
    //     </div>
    // </>
    return (
        <div className="app-container">
            <Header/>
            <Banner />
            <SearchForm />
            <EditSection />
            <LibrariesInfoSection />
            <Footer />
        </div>
    );
}

export default App;
