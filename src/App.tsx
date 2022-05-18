import Grid from "./components/Grid";
import Model from "./pages/Model";
import { Controls, useControl } from "react-three-gui";
import { Canvas } from "react-three-fiber";
import Model2D from "./3DComponents/Model2D";

function App() {
  return (
    <div>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Model2D />
      </Canvas>
    </div>
  );
}

export default App;
