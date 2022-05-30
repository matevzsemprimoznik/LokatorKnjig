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
import LibraryProvider from "./context/libraryContext";

function App() {
  return (
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
            </Routes>
          </BrowserRouter>
        </ModelProvider>
      </LibraryProvider>

  );
}

export default App;
