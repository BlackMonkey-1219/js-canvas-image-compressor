import { MutableRefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import Container from "./components/Conainer/Container";
import Grid from "./components/Grid/Grid";

import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import DropZone from "./components/DropZone/DropZone";
import Canvas from "./components/Canvas/Canvas";
import FileDisplay from "./components/FileDisplay/FileDisplay";

function App() {
  const [imageFiles, setImageFiles] = useState<Array<File>>([]);

  const originalImageLoadFunction = useRef<
    (img: HTMLImageElement) => number[] | null
  >(null) as React.MutableRefObject<(img: HTMLImageElement) => number[] | null>;

  const mutableImageLoadFunction = useRef<
    (img: HTMLImageElement) => number[] | null
  >(null) as React.MutableRefObject<(img: HTMLImageElement) => number[] | null>;

  const imageResizeFunction = useRef<(w: number, h: number) => void | null>(
    null
  ) as MutableRefObject<(w: number, h: number) => void | null>;

  const imageDownloadFunction = useRef<
    (imageType: string, quality: number) => string | null
  >(null) as MutableRefObject<
    (imageType: string, quality: number) => string | null
  >;

  const imageWidth = useRef<number>(0);
  const imageHeight = useRef<number>(0);
  const imageQuality = useRef<number>(0.5);
  const imageDownloadType = useRef<string>("");

  return (
    <div className="App">
      <Container maxWidth={"max-w-screen-lg"}>
        <Grid
          width={"w-fit"}
          height={`h-full`}
          direction={`flex-row`}
          alignItems={`items-start`}
          justifyContent={`justify-between`}>
          {/* FILE DISPLAY */}
          <div className={`w-full h-full flex-[1]`}>
            <FileDisplay
              imageFiles={imageFiles}
              originalImageLoadFunction={originalImageLoadFunction.current}
              mutableImageLoadFunction={mutableImageLoadFunction.current}
            />
          </div>

          {/* TOOL KIT */}
          <div className={`w-full h-full flex-[3]`}>
            <Grid
              width={"w-full"}
              height={"h-fit"}
              direction={"flex-col"}>
              {/* TOP */}
              <Grid
                width={"w-full"}
                height={"h-fit"}
                direction={"flex-row"}>
                {/* SETTINGS PANEL */}
                <div className={`flex-[3]`}>
                  <SettingsPanel
                    widthValue={imageWidth}
                    heightValue={imageHeight}
                    imageQuality={imageQuality}
                    imageType={imageDownloadType}
                    resizeFunction={imageResizeFunction}
                    downloadFunction={imageDownloadFunction}
                  />
                </div>
                {/* DROP ZONE */}
                <div className={`flex-[1]`}>
                  <DropZone setImageFilesFunction={setImageFiles} />
                </div>
              </Grid>

              {/* BOTTOM */}
              <Grid
                width={"w-full"}
                height={"h-fit"}
                direction={"flex-row"}>
                {/* ORIGINAL IMAGE */}
                <div className={`flex-[1]`}>
                  <Canvas loadImageFunctionHolder={originalImageLoadFunction} />
                </div>
                {/* MUTATED IMAGE */}
                <div className={`flex-[1]`}>
                  <Canvas
                    loadImageFunctionHolder={mutableImageLoadFunction}
                    imageResizeFunctionHolder={imageResizeFunction}
                    imageDownloadFunctionHolder={imageDownloadFunction}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
