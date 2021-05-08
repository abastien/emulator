import React, {useEffect, useLayoutEffect, useRef, useState} from "react";

const Scene = (): JSX.Element => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvasObj = canvasRef.current;
    const canvasCtx = canvasObj.getContext('2d');
    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, width, height);
  }, [width, height, canvasRef]);

  useEffect(() => {
    const resize = (): void => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [])

  return <canvas ref={canvasRef} width={width} height={height} />;
}

export default Scene;
