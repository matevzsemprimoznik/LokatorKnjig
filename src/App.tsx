import Grid from './components/Grid';
import Model from './pages/Model';
import { Controls, useControl } from 'react-three-gui';
import  Canvas  from './components/Canvas';
import WallProvider, {WallContext} from "./context/wallElementsContext";

function App() {
  return (
    <div>
      {/*<Canvas camera={{ position: [0, 5, 10], fov: 60 }}>*/}
      {/*  <Model />*/}
      {/*</Canvas>*/}
        <WallProvider>
            <Canvas />
        </WallProvider>

    </div>
  );
}

export default App;
