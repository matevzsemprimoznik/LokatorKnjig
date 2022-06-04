import Grid from './components/Grid';
import Model from './3DComponents/Model';

import {Controls, useControl} from 'react-three-gui';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import LibraryModel from './pages/LibraryModel';
import {useState} from 'react';
import {ModelShape} from '@babylonjs/core/Particles/solidParticle';
import Home from './pages/Home';
import './index.css';
import ModelProvider from './context/modelContext';
import Header from './components/landing_page/Header';
import Login from './pages/Login';
import AuthProvider from './context/authContext';
import AddFloorPlan from './pages/AddFloorPlan';
import LibraryProvider from "./context/libraryContext";
import MenuProvider from "./context/menuContext";
import Canvas from "./components/Canvas";
import FloorPlanEditingPage from "./pages/FloorPlanEditingPage";
import WallProvider from "./context/wallElementsContext";

function App() {
    return (
        <MenuProvider>
            <AuthProvider>
                <LibraryProvider>
                    <ModelProvider>
                        <BrowserRouter>
                            <Header/>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/library-model'>
                                    <Route path=':library/' element={<LibraryModel/>}>
                                        <Route path=':selected' element={<LibraryModel/>}/>
                                    </Route>
                                    <Route path='' element={<LibraryModel/>}/>
                                </Route>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='add-floor-plan' element={<Outlet />}>
                                    <Route path='' element={<AddFloorPlan />} />
                                    <Route path=':abbr/'>
                                        <Route path='' element={<>
                                            <AddFloorPlan/>
                                            <Outlet />
                                        </>} />
                                        <Route path='floor-editing' element={<FloorPlanEditingPage />} />
                                        <Route path='room-editing' element={<WallProvider><Canvas /></WallProvider>}/>
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </ModelProvider>
                </LibraryProvider>
            </AuthProvider>
        </MenuProvider>

    );
}

export default App;
