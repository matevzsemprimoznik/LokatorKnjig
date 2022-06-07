import React, {useContext, useEffect, useRef, useState} from 'react';
import Draggable, {DraggableEvent} from 'react-draggable';
import '../styles/floorEditingPage/FlooPlanEditingPage.css';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';
import Button from '../components/Button';
import Drawer from '../components/Drawer';
import {LibraryContext, ServerRoute} from '../context/libraryContext';
import {useNavigate, useParams} from 'react-router-dom';
import {MenuContext} from '../context/menuContext';
import {libraryApi} from '../context/axios';

const MenuIconUrl = '../../menu-button.svg';
const RotateIconUrl = '../../rotate.png';

const FloorPlanEditingPage = () => {
    const navigate = useNavigate();
    const {toggleMenuOpen} = React.useContext(MenuContext);
    const {abbr, floor} = useParams();
    const {getSvgs, svgs} = useContext(LibraryContext);
    const [scale, setScale] = useState(1);
    const positions = useRef<Array<{ x: number; y: number }>>([]);
    const [rooms, setRooms] = useState<any>([]);

    useEffect(() => {
        if (abbr && floor) getSvgs(abbr, floor);
    }, []);

    useEffect(() => {
        setRooms(svgs.map(svg => {
            return {...svg, rotation: 0, isRotationButtonHidden: true, isOnCanvas: false, position: {x: 0, y: 0}}
        }));
    }, [svgs.length]);

    const rotateElement = (label: number) => {
        setRooms((prevState: any) => {
            return [...prevState.map((el: any) => {
                if (el.label === label) {
                    el.rotation += 90
                }
                return el
            })];
        });
    };


    const selectElement = (label: string) => {
        setRooms((prevState: any) =>
            prevState.map((element: any) => {
                if (element.label === label) return {...element, isRotationButtonHidden: false};
                else return {...element, isRotationButtonHidden: true};
            })
        );
    };

    const onSubmit = () => {
        console.log(rooms)
        const center = {
            x:
                rooms.map((room: any) => room.position).reduce((previousValue: any, currentValue: any) => previousValue + currentValue.x, 0) /
                rooms.length,
            y:
                rooms.map((room: any) => room.position).reduce((previousValue: any, currentValue: any) => previousValue + currentValue.y, 0) /
                rooms.length,
        };
        console.log('center', center)
        const data = rooms.map((room: any) => {
            return {
                label: room.label,
                center: {
                    x: (room.position.x - center.x) / 22,
                    y: 0,
                    z: (room.position.y - center.y) / 22
                }
            }
        })
        console.log(data)
        saveCenterOfAllRooms(data)
    };
    const saveElementPosition = (e: DraggableEvent, label: string) => {
        if ('clientX' in e && 'clientY' in e) {
            setRooms((prevState: any) => [...prevState.map((room: any) => {
                if (room.label === label) {
                    return {...room, position: {x: e.clientX, y: e.clientY}}
                }
                return room
            })]);
        }
    };

    const saveCenterOfAllRooms = async (data: any) => {
        try {
            const response = await libraryApi.post(`editor/${abbr}/space`, data);
            navigate(`/add-floor-plan/${abbr}`);

        } catch (err) {
            console.log(err);
        }
    }

    const onClickDrawerBodyElement = (element: any) => {
        console.log(element)
        setRooms((prevState: any) => [...prevState.map((room: any) => {
            if (room.label === element.text) {
                return {...room, isOnCanvas: true}
            }
            return room
        })]);


    };


    return (
        <>
            <Button onClick={onSubmit} position={{top: 8, right: 2}} text={'Save'}/>
            <TransformWrapper
                initialScale={1}
                disabled={false}
                minScale={0.5}
                maxScale={3}
                limitToBounds={false}
                pinch={{step: 5}}
                panning={{disabled: true}}
                onZoom={(ref) => setScale(ref.state.scale)}
            >
                <TransformComponent contentClass='main' wrapperStyle={{height: '100%', width: '100%'}}>
                    {rooms.map((element: any, index: number) => element.isOnCanvas && (
                            <Draggable
                                key={index}
                                defaultPosition={{x: window.screen.width / 2 - 150, y: 100}}
                                scale={scale}
                                onDrag={(e) => saveElementPosition(e, element.label)}
                            >
                                <div className='draggable'>
                                    <img style={{transform: `rotate(${element.rotation}deg)`, width: '300px'}}
                                         onClick={() => selectElement(element.label)}
                                         src={`data:image/svg+xml;base64,${element.svg}`}/>

                                    {!element.isRotationButtonHidden &&
                                        <button onClick={() => rotateElement(element.label)}><img src={RotateIconUrl}/>
                                        </button>}
                                </div>
                            </Draggable>
                        )
                    )}
                </TransformComponent>
            </TransformWrapper>
            <Drawer
                section={'Prostori'}
                defaultFloor={-1}
                bodyElements={rooms.filter((room: any) => !room.isOnCanvas).map((room: any) => {
                    return {text: room.label};
                })}
                onClickBodyElement={onClickDrawerBodyElement}
            />
            <Button position={{top: 8, left: 2}} onClick={toggleMenuOpen} image={MenuIconUrl}/>
        </>
    );
};

export default FloorPlanEditingPage;
