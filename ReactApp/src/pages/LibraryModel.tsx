import React, {useContext, useEffect, Suspense} from 'react';
import {useParams} from 'react-router-dom';
import {Canvas} from 'react-three-fiber';
import Button from '../components/Button';
import {ModelContext, ModelType} from '../context/modelContext';
import Model from '../3DComponents/Model';
import {LibraryContext} from "../context/libraryContext";
import {MenuContext} from "../context/menuContext";
import Drawer from "../components/Drawer";
import SearchUDK from '../components/SearchUDK';
import {Loading} from "../components/Loading";

const RotateIconUrl = '../../images/rotate.png';
const FirstPersonViewIconUrl = '../../images/360-view.png';
const MenuIconUrl = '../../menu-button.svg';

const LibraryModel = () => {
  const { library, selected } = useParams();
  const { modelType, setModelType } = useContext(ModelContext);
  const {floorData, getFloorData ,getAllFloors, floors, getSpecificFloorData, section} = useContext(LibraryContext)
    const { toggleMenuOpen } = React.useContext(MenuContext);

    useEffect(() => {
        if(library) {
            if(selected)
                getFloorData(library, selected)
            else {
                getFloorData(library, "");
            }
        }

    }, [selected])

    useEffect(() => {
        if(library)
        getAllFloors(library)
    }, [])

  const onClick = () => {
    if (modelType !== ModelType._2D) setModelType(ModelType._2D);
    else setModelType(ModelType._3D);
  };

  const switchFromFirstPersonTo360View = () => {
    if (modelType === ModelType._3D) setModelType(ModelType.FIRST_PERSON);
    else setModelType(ModelType._3D);
  };

  const onClickDrawerBodyElement = (element: any) => {
      if(library) getSpecificFloorData(library, element.key)
  }

  if(floorData.length === 0)
      return <Loading/>

  return (
    <>
      <SearchUDK library={library}/>
      <div style={{height: "90vh"}}>
          <Suspense fallback={<Loading/>}>
              <Canvas id='canvas-container'>
                  <Model selected={selected} modelType={modelType} setModelType={setModelType} floorData={floorData} />
              </Canvas>
          </Suspense>
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
        <Button
            position={{ top: 8, left: 2 }}
            onClick={toggleMenuOpen}
            image={MenuIconUrl}
        />
        <Drawer isOpen={true} section={section} defaultFloor={floorData.length !== 0 ? floorData[0].floor : 0} bodyElements={floors.map(floor => {return {text: 'Nadstropje ' + floor, key: floor}})} onClickBodyElement={onClickDrawerBodyElement}/>
    </>
  );
};

export default LibraryModel;
