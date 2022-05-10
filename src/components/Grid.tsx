import { useEffect, useState } from 'react';
import { renderer } from '../utils/renderer';
import Node from './Node';

let mousedown = false;
let eraseMode = false;

const Grid = () => {
  const [gridHeight, setGridHeight] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    setGridHeight(
      Math.round((window.innerHeight / (window.innerHeight * 0.05)) * 5)
    );
    setGridWidth(
      Math.round((window.innerWidth / (window.innerWidth * 0.05)) * 8)
    );
  }, []);

  useEffect(() => {
    const container = document.getElementById('grid');
    if (container != null) {
      const instance = renderer({
        scaleSensitivity: 50,
        minScale: 0.1,
        maxScale: 30,
        element: container.children[0],
      });
      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        instance.zoom({
          deltaScale: Math.sign(event.deltaY) > 0 ? -1 : 1,
          x: event.pageX,
          y: event.pageY,
        });
      });
      const moveGrid = (event: {
        preventDefault: () => void;
        movementX: any;
        movementY: any;
      }) => {
        event.preventDefault();
        instance.panBy({
          originX: event.movementX,
          originY: event.movementY,
        });
      };
      container.addEventListener('mousedown', (event) => {
        mousedown = true;
        if (event.shiftKey) container.addEventListener('mousemove', moveGrid);
      });
      container.addEventListener('mouseup', (event) => {
        mousedown = false;
        container.removeEventListener('mousemove', moveGrid);
      });
    }
  }, []);

  const changeNodeColor = (id: number, clicked = false) => {
    if (!mousedown && !clicked) return;

    const element = document.getElementById(`${id}`);
    if (element != null) {
      if (!eraseMode) element.style.backgroundColor = 'orange';
      else element.style.backgroundColor = 'white';
    }
  };
  const generateGrid = () => {
    console.log(gridHeight);

    return [...Array(gridHeight).keys()].map((i) => {
      return [...Array(gridWidth).keys()].map((j) => (
        <Node
          id={i * gridWidth + j}
          changeColor={changeNodeColor}
          size={window.innerWidth * 0.05}
          key={i * gridWidth + j}
        />
      ));
    });
  };
  return (
    <div
      style={{ position: 'absolute', top: '-1300px', left: '-1000px' }}
      id='grid'
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: window.innerWidth * 7,
          position: 'absolute',
          left: '-1000px',
        }}
      >
        {generateGrid()}
      </div>
      <button
        style={{ position: 'fixed', top: '100px', left: '100px' }}
        onClick={() => (eraseMode = !eraseMode)}
      >
        click
      </button>
    </div>
  );
};

export default Grid;
