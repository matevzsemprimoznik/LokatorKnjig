import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from 'react-three-fiber';
import Button from '../components/Button';
import { ModelContext, ModelType } from '../context/modelContext';
import Model from '../3DComponents/Model';

const RotateIconUrl = '../../images/rotate.png';
const FirstPersonViewIconUrl = '../../images/360-view.png';

const LibraryModel = () => {
  const { selected } = useParams();
  const { modelType, setModelType, previousModelType } = useContext(ModelContext);

  const onClick = () => {
    if (modelType !== ModelType._2D) setModelType(ModelType._2D);
    else setModelType(previousModelType);
  };

  const switchFromFirstPersonTo360View = () => {
    if (modelType === ModelType._3D) setModelType(ModelType.FIRST_PERSON);
    else setModelType(ModelType._3D);
  };

  return (
    <>
      <Canvas>
        <Model selected={selected} modelType={modelType} setModelType={setModelType} />
      </Canvas>
      <Button
        position={{ top: 2, right: 2 }}
        onClick={onClick}
        text={modelType === ModelType._2D ? ModelType._3D : ModelType._2D}
      />
      <Button
        position={{ top: 8, right: 2 }}
        onClick={switchFromFirstPersonTo360View}
        image={modelType === ModelType.FIRST_PERSON ? RotateIconUrl : FirstPersonViewIconUrl}
      />
    </>
  );
};

export default LibraryModel;
