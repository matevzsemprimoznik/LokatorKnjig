import {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Canvas} from 'react-three-fiber';
import Button from '../components/Button';
import {ModelContext, ModelType} from '../context/modelContext';
import Model from '../3DComponents/Model';
import {LibraryContext} from "../context/libraryContext";

const RotateIconUrl = '../../images/rotate.png';
const FirstPersonViewIconUrl = '../../images/360-view.png';

const LibraryModel = () => {
  const { selected } = useParams();
  const { modelType, setModelType } = useContext(ModelContext);
  const {floorData, getFloorData} = useContext(LibraryContext)

    useEffect(() => {
        if(selected)
            getFloorData('KTF', selected)
    }, [selected])

  const onClick = () => {
    if (modelType !== ModelType._2D) setModelType(ModelType._2D);
    else setModelType(ModelType._3D);
  };

  const switchFromFirstPersonTo360View = () => {
    if (modelType === ModelType._3D) setModelType(ModelType.FIRST_PERSON);
    else setModelType(ModelType._3D);
  };

  if(!floorData)
      return <div>Loading</div>

  return (
    <>
      <div style={{height: "90vh"}}>
        <Canvas>
          <Model selected={selected} modelType={modelType} setModelType={setModelType} floorData={floorData} />
        </Canvas>
      </div>
      <Button
        position={{ top: 8, right: 2 }}
        onClick={onClick}
        text={modelType === ModelType._2D ? ModelType._3D : ModelType._2D}
      />
      <Button
        position={{ top: 14, right: 2 }}
        onClick={switchFromFirstPersonTo360View}
        image={modelType === ModelType.FIRST_PERSON ? RotateIconUrl : FirstPersonViewIconUrl}
      />
    </>
  );
};

export default LibraryModel;
