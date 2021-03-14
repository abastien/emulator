import React, {useEffect, useRef} from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Scene = (): JSX.Element => {
  const { width, height } = useWindowDimensions();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const canvasCtx = canvasObj.getContext('2d');
    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, width, height);
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default Scene;
