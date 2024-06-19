// src/MoonBoard.js
import { useState } from 'react';
import { Stage, Layer, Circle, Image as KonvaImage } from 'react-konva';
import { useImage } from 'react-konva-utils';

const MoonBoard = () => {
  const [image] = useImage(process.env.PUBLIC_URL + '/image.jpeg');
  const [circles, setCircles] = useState([]);

  const handleStageClick = (event) => {
    const stage = event.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    setCircles([...circles, pointerPosition]);
  };

  const handleCircleClick = (index) => {
    setCircles(circles.filter((_, i) => i !== index));
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} onClick={handleStageClick}>
      <Layer>
        {image && <KonvaImage image={image} />}
        {circles.map((circle, index) => (
          <Circle
            key={index}
            x={circle.x}
            y={circle.y}
            radius={20}
            stroke="red"
            strokeWidth={2}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default MoonBoard;