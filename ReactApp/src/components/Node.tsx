import { FC, useEffect, useState } from 'react';

interface NodeProps {
  id: number;
  size: number;
  changeColor: (key: number, clicked?: boolean) => void;
}
const Node: FC<NodeProps> = ({ id, size, changeColor }) => {
  return (
    <div
      id={`${id}`}
      style={{
        height: size,
        width: size,
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
      onMouseDown={(event) => !event.shiftKey && changeColor(id, true)}
      onMouseEnter={(event) => !event.shiftKey && changeColor(id)}
    ></div>
  );
};

export default Node;
