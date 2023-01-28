import React, { MutableRefObject, useEffect, useRef } from "react";
import Card from "../Card/Card";

import CanvasClass from "../../utils/CanvasClass";

interface ICanvas {
  loadImageFunctionHolder: MutableRefObject<
    (img: HTMLImageElement) => number[] | null
  >;
  imageResizeFunctionHolder?: MutableRefObject<
    (w: number, h: number) => void | null
  >;
  imageDownloadFunctionHolder?: MutableRefObject<
    (imageType: string, quality: number) => string | null
  >;
}

function Canvas(props: ICanvas) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasClass = new CanvasClass(canvas.current!);

    props.loadImageFunctionHolder.current = canvasClass.loadImage;

    if (props.imageResizeFunctionHolder) {
      props.imageResizeFunctionHolder.current = canvasClass.scale;
    }

    if (props.imageDownloadFunctionHolder) {
      props.imageDownloadFunctionHolder.current = canvasClass.saveImage;
    }
  }, []);

  return (
    <Card>
      <canvas
        ref={canvas}
        className={`aspect-square w-full`}></canvas>
    </Card>
  );
}

export default Canvas;
