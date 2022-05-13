import Grid from './components/Grid';
import Model from './pages/Model';
import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';

function App() {
  return (
    <div>
      <Canvas>
        <Model />
      </Canvas>
    </div>
  );
}

export default App;
