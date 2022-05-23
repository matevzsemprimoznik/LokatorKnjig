import Grid from './components/Grid';
import Model from './3DComponents/Model';

import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LibraryModel from './pages/LibraryModel';
import { useState } from 'react';
import Model2D from './3DComponents/Model2D';
import { ModelShape } from '@babylonjs/core/Particles/solidParticle';
import Home from './pages/Home';
import './index.css';
import ModelProvider from './context/modelContext';

function App() {
  return (
    <ModelProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/library-model'>
            <Route path=':selected' element={<LibraryModel />}></Route>
            <Route path='' element={<LibraryModel />} />
          </Route>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ModelProvider>
  );
}

export default App;
