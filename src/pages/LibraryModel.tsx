import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {Canvas} from 'react-three-fiber';
import Button from '../components/Button';
import {ModelContext, ModelType} from '../context/modelContext';
import Model from '../3DComponents/Model';

const LibraryModel = () => {
  const { selected } = useParams();
  const { modelType, setModelType } = useContext(ModelContext);

  const onClick = () => {
    if (modelType === ModelType._3D) setModelType(ModelType._2D);
    else setModelType(ModelType._3D);
  };

  return (
    <>
      <Canvas>
        <Model selected={selected} modelType={modelType} setModelType={setModelType} />
      </Canvas>
      <Button position={{ top: 2, right: 2 }} onClick={onClick} text={modelType === ModelType._2D ? ModelType._3D : ModelType._2D}/>
    </>
  );
};

export default LibraryModel;
