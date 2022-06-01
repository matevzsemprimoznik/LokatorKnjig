import Grid from './components/Grid';
import Model from './3DComponents/Model';

import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LibraryModel from './pages/LibraryModel';
import { useState } from 'react';
import { ModelShape } from '@babylonjs/core/Particles/solidParticle';
import Home from './pages/Home';
import './index.css';
import ModelProvider from './context/modelContext';
import Header from './components/landing_page/Header';
import Login from './pages/Login';
import AuthProvider from './context/authContext';
import AddFloorPlan from './pages/AddFloorPlan';
import LibraryProvider from "./context/libraryContext";
import MenuProvider from "./context/menuContext";

function App() {
  return (
      <MenuProvider>
          <AuthProvider>
              <LibraryProvider>
                  <ModelProvider>
                      <BrowserRouter>
                          <Header />
                          <Routes>
                              <Route path='/library-model'>
                                  <Route path=':selected' element={<LibraryModel />}></Route>
                                  <Route path='' element={<LibraryModel />} />
                              </Route>
                              <Route path='/' element={<Home />} />
                              <Route path='/login' element={<Login />} />
                              <Route path='/add-floor-plan' element={<AddFloorPlan />} />
                          </Routes>
                      </BrowserRouter>
                  </ModelProvider>
              </LibraryProvider>
          </AuthProvider>
      </MenuProvider>

  );
}

export default App;
