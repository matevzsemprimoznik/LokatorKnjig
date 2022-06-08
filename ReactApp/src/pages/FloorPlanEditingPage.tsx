import React, { useContext, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import '../styles/floorEditingPage/FlooPlanEditingPage.css';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Button from '../components/Button';
import Drawer from '../components/Drawer';
import { LibraryContext, ServerRoute } from '../context/libraryContext';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuContext } from '../context/menuContext';
import { libraryApi } from '../context/axios';
import Header from '../components/landing_page/Header';
import { relative } from 'path';

const MenuIconUrl = '../../menu-button.svg';
const RotateIconUrl = '../../rotate.png';

const FloorPlanEditingPage = () => {
  const navigate = useNavigate();
  const { toggleMenuOpen } = React.useContext(MenuContext);
  const { abbr, floor } = useParams();
  const { getSvgs, svgs } = useContext(LibraryContext);
  const [scale, setScale] = useState(1);
  const positions = useRef<Array<{ x: number; y: number }>>([]);
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    if (abbr && floor) getSvgs(abbr, floor);
  }, []);

  useEffect(() => {
    setRooms(
      svgs.map((svg) => {
        const svgString = window.atob(svg.svg).toString();
        const widthPosition = svgString.indexOf('viewBox') + 9;
        const viewBoxString = svgString.substring(widthPosition, svgString.indexOf('"', widthPosition));
        const width = viewBoxString.split(' ')[2];
        const height = viewBoxString.split(' ')[3];
        return {
          ...svg,
          rotation: 0,
          isRotationButtonHidden: true,
          isOnCanvas: false,
          position: {
            x: window.screen.width / 2 - 150,
            y: 100,
          },
          width,
          height,
        };
      })
    );
  }, [svgs.length]);

  const rotateElement = (label: number) => {
    setRooms((prevState: any) => {
      return [
        ...prevState.map((el: any) => {
          if (el.label === label) {
            el.rotation += 90;
          }
          return el;
        }),
      ];
    });
  };

  const selectElement = (label: string) => {
    console.log(label);
    setRooms((prevState: any) =>
      prevState.map((element: any) => {
        if (element.label === label) return { ...element, isRotationButtonHidden: false };
        else return { ...element, isRotationButtonHidden: true };
      })
    );
  };

  const onSubmit = () => {
    console.log(rooms);

    const maxX = Math.max(...rooms.map((room: any) => room.position.x));
    const minX = Math.min(...rooms.map((room: any) => room.position.x));
    const maxY = Math.max(...rooms.map((room: any) => room.position.y));
    const minY = Math.min(...rooms.map((room: any) => room.position.y));
    const center = {
      x: (maxX + minX) / 2,
      y: (maxY + minY) / 2,
    };
    console.log('center', center);
    const data = rooms.map((room: any) => {
      return {
        label: room.label,
        center: {
          x: room.position.x - center.x,
          y: 0,
          z: room.position.y - center.y,
        },
        rotation: room.rotation,
      };
    });
    console.log(data);
    saveCenterOfAllRooms(data);
  };
  const saveElementPosition = (e: DraggableEvent, label: string) => {
    //@ts-ignore
    const viewportOffset = e.target.getBoundingClientRect();
    if ('clientX' in e && 'clientY' in e) {
      setRooms((prevState: any) => [
        ...prevState.map((room: any) => {
          if (room.label === label) {
            return {
              ...room,
              position: {
                x: viewportOffset.x + viewportOffset.width / 2,
                y: viewportOffset.y + viewportOffset.height / 2,
              },
            };
          }
          return room;
        }),
      ]);
    }
  };

  const saveCenterOfAllRooms = async (data: any) => {
    try {
      const response = await libraryApi.post(`editor/${abbr}/space`, { spaces: data });
      navigate(`/add-floor-plan/${abbr}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickDrawerBodyElement = (element: any) => {
    setRooms((prevState: any) => [
      ...prevState.map((room: any) => {
        if (room.label === element.text) {
          return { ...room, isOnCanvas: true };
        }
        return room;
      }),
    ]);
  };

  return (
    <>
      <Header />
      <Button onClick={onSubmit} position={{ top: 8, right: 2 }} text={'Save'} />
      <TransformWrapper
        initialScale={1}
        disabled={false}
        minScale={0.5}
        maxScale={3}
        limitToBounds={false}
        pinch={{ step: 5 }}
        panning={{ disabled: true }}
        onZoom={(ref) => setScale(ref.state.scale)}
      >
        <TransformComponent contentClass='main' wrapperStyle={{ height: '100%', width: '100%' }}>
          {rooms.map((element: any, index: number) => {
            return (
              element.isOnCanvas && (
                <Draggable
                  key={index}
                  defaultPosition={{ x: window.screen.width / 2 - 150, y: 100 }}
                  scale={scale}
                  onDrag={(e) => saveElementPosition(e, element.label)}
                >
                  <div
                    className='draggable'
                    style={{
                      width: element.width + 'px',
                      height: element.height + 'px',
                    }}
                    onClick={() => selectElement(element.label)}
                  >
                    <div
                      style={{
                        width: element.width + 'px',
                        height: element.height + 'px',
                        transform: `rotate(${element.rotation}deg)`,
                        position: 'relative',
                      }}
                    >
                      <img
                        style={{
                          width: element.width + 'px',
                        }}
                        src={`data:image/svg+xml;base64,${element.svg}`}
                      />

                      {!element.isRotationButtonHidden && (
                        <button onClick={() => rotateElement(element.label)}>
                          <img src={RotateIconUrl} />
                        </button>
                      )}
                    </div>
                  </div>
                </Draggable>
              )
            );
          })}
        </TransformComponent>
      </TransformWrapper>
      <Drawer
        section={'Prostori'}
        defaultFloor={-1}
        bodyElements={rooms
          .filter((room: any) => !room.isOnCanvas)
          .map((room: any) => {
            return { text: room.label };
          })}
        onClickBodyElement={onClickDrawerBodyElement}
      />
      <Button position={{ top: 8, left: 2 }} onClick={toggleMenuOpen} image={MenuIconUrl} />
    </>
  );
};

export default FloorPlanEditingPage;
