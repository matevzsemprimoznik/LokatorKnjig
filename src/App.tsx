import Grid from './components/Grid';
import Model from './pages/Model';

import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Library from './pages/Library';
import { useState } from 'react';
import Model2D from './3DComponents/Model2D';
import { ModelShape } from '@babylonjs/core/Particles/solidParticle';

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:selected' element={<Library />}></Route>
        <Route path='/' element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
