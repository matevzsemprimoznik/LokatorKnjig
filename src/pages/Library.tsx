import { useParams } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import Model from "./Model";

const Library = () => {

  const { selected } = useParams();

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <Model selected={selected}/>
    </Canvas>
  );
};

export default Library;
