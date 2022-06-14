import React, {Suspense, useContext, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Canvas} from 'react-three-fiber';
import Button from '../components/Button';
import {ModelContext, ModelType} from '../context/modelContext';
import {LibraryContext, ServerRoute} from '../context/libraryContext';
import {MenuContext} from '../context/menuContext';
import Drawer from '../components/Drawer';
import SearchUDK from '../components/SearchUDK';
import {Loading} from '../components/Loading';
import Header from '../components/landing_page/Header';
import Loader from "../utils/Loader";
import Model from "../3DComponents/Model";

const RotateIconUrl = '../../images/rotate.png';
const FirstPersonViewIconUrl = '../../images/360-view.png';
const MenuIconUrl = '../../menu-button.svg';

const LibraryModel = () => {
    const {library} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const selected = searchParams.get('udk');
    const {modelType, setModelType} = useContext(ModelContext);
    const {
        floorData,
        getFloorData,
        getAllFloors,
        floors,
        getSpecificFloorData,
        section,
        setIsModelLoaded,
        isModelLoaded
    } = useContext(LibraryContext);
    const {toggleMenuOpen} = React.useContext(MenuContext);

    useEffect(() => {
        if (library) {
            if (selected) {
                getFloorData(library, selected);
                getAllFloors(ServerRoute.LIBRARIES, library)
            } else {
                getFloorData(library, '');
            }
        }
    }, [selected]);


    useEffect(() => {
        if (library) getAllFloors(ServerRoute.LIBRARIES, library);
    }, []);

    useEffect(() => {
        setModelType(ModelType._2D)
    }, [floorData])

    const onClick = () => {
        if (modelType !== ModelType._2D) setModelType(ModelType._2D);
        else setModelType(ModelType._3D);
    };

    const switchFromFirstPersonTo360View = () => {
        if (modelType === ModelType._3D) setModelType(ModelType.FIRST_PERSON);
        else setModelType(ModelType._3D);
    };

    const onClickDrawerBodyElement = (element: any) => {
        if (library) {
            getSpecificFloorData(ServerRoute.LIBRARIES, library, element.key);

        }
    };
    return (
        <>
            <Header/>
            <SearchUDK library={library}/>
            <div style={{height: '90vh'}}>
                <Loader isModelLoaded={isModelLoaded}
                        conditionForSuccess={floorData.length !== 0 && floors.length !== 0}>
                    <Canvas id='canvas-container'>
                        <Model selected={selected} modelType={modelType}
                               setModelType={setModelType} floorData={floorData} setIsModelLoaded={setIsModelLoaded}/>
                    </Canvas>
                </Loader>
            </div>
            <Button
                position={{top: 8, right: 2}}
                onClick={onClick}
                text={modelType === ModelType._2D ? ModelType._3D : ModelType._2D}
            />
            <Button
                position={{top: 14, right: 2}}
                onClick={switchFromFirstPersonTo360View}
                image={modelType === ModelType.FIRST_PERSON ? RotateIconUrl : FirstPersonViewIconUrl}
            />
            <Button position={{top: 8, left: 2}} onClick={toggleMenuOpen} image={MenuIconUrl}/>
            <Drawer
                isOpen={true}
                section={section}
                defaultFloor={floorData.length !== 0 ? floorData[0].floor : 0}
                bodyElements={floors.map((floor) => {
                    return {text: 'Nadstropje ' + floor, key: floor};
                })}
                onClickBodyElement={onClickDrawerBodyElement}
            />
        </>
    );
};

export default LibraryModel;
