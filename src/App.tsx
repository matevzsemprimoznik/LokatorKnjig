import Grid from "./components/Grid";
import Model from "./pages/Model";
import { Controls, useControl } from "react-three-gui";
import { Canvas } from "react-three-fiber";
import Model2D from "./3DComponents/Model2D";
import { ModelShape } from "@babylonjs/core/Particles/solidParticle";

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
