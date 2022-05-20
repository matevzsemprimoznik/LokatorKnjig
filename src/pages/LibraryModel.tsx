import {useContext, useState} from 'react';
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
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Model selected={selected} modelType={modelType} />
      </Canvas>
      <Button position={{ top: 2, right: 2 }} onClick={onClick} text={modelType}/>
    </>
  );
};

export default LibraryModel;
