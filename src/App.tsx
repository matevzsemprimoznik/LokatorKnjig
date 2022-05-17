import Grid from "./components/Grid";
import Model from "./pages/Model";
import { Controls, useControl } from "react-three-gui";
import { Canvas } from "react-three-fiber";

function App() {
  return (
    <div>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }} shadows>
        <Model />
      </Canvas>
    </div>
  );
}

export default App;
