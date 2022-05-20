import Grid from './components/Grid';
import Model from './pages/Model';

import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Library from './pages/Library';
import { useState } from 'react';
import Model2D from './3DComponents/Model2D';
import { ModelShape } from '@babylonjs/core/Particles/solidParticle';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/library-model/:selected' element={<Library />} />
        <Route path='/library-model' element={<Library />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
