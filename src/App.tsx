import { useEffect, useRef } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Container from "./components/Conainer/Container";
import Grid from "./components/Grid/Grid";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Canvas from "./utils/Canvas";

function App() {
  const wInput = useRef<HTMLInputElement>(null);
  const hInput = useRef<HTMLInputElement>(null);
  const mutateBtn = useRef<HTMLButtonElement>(null);
  const downloadBtn = useRef<HTMLButtonElement>(null);
  const oCanvas = useRef<HTMLCanvasElement>(null);
  const mCanvas = useRef<HTMLCanvasElement>(null);
  const dropZone = useRef<HTMLDivElement>(null);

  const oic = useRef<Canvas | null>();
  const mic = useRef<Canvas | null>();
  const imageList = useRef<FileList | null>();

  useEffect(() => {
    mutateBtn.current!.addEventListener("click", (e) => {
      mutate();
    });
  }, []);

  useEffect(() => {
    const fr = new FileReader();
    oic.current = new Canvas(oCanvas.current!);
    mic.current = new Canvas(mCanvas.current!);

    dropZone.current!.addEventListener("dragover", (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.current!.innerText = "OK, DROP";
    });
    dropZone.current!.addEventListener("dragend", (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.current!.innerText = "DROP HERE";
    });
    dropZone.current!.addEventListener("drop", (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      imageList.current = e.dataTransfer!.files;

      fr.onloadend = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        const WxH = oic.current!.loadImage(img);
        wInput.current!.value = WxH[0].toString();
        hInput.current!.value = WxH[1].toString();

        mic.current!.loadImage(img);
      };

      fr.readAsDataURL(imageList.current![0]);
    });

    return () => {
      oic.current = null;
      mic.current = null;
      imageList.current = null;
    };
  }, []);

  function mutate() {
    mic.current!.scale(
      parseFloat(wInput.current!.value),
      parseFloat(hInput.current!.value)
    );
  }

  return (
    <div className="App">
      <Container maxWidth={"max-w-screen-md"}>
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
              <Card>
                <Grid
                  width={"w-full"}
                  height={"h-fit"}
                  direction={"flex-col"}>
                  <span>Scale</span>
                  <Grid
                    width={"w-full"}
                    height={"h-fit"}
                    direction={"flex-row"}
                    alignItems={"items-center"}
                    justifyContent={`justify-between`}>
                    <Input
                      refLink={wInput}
                      width={"w-full"}
                      placeholder={`WIDTH`}
                    />
                    <span>X</span>
                    <Input
                      refLink={hInput}
                      width={"w-full"}
                      placeholder={`HEIGHT`}
                    />
                  </Grid>

                  <hr />
                  <span>Quality</span>
                  <Grid
                    width={"w-full"}
                    height={"h-fit"}
                    direction={`flex-col`}
                    alignItems={"items-center"}
                    justifyContent={`justify-between`}>
                    <input
                      type={"range"}
                      className={`w-full`}
                    />
                    <Button
                      refLink={mutateBtn}
                      width={"w-full"}
                      color={"bg-primary text-white"}>
                      MUTATE
                    </Button>
                    <Button
                      refLink={downloadBtn}
                      width={"w-full"}
                      color={
                        "bg-secondary border-2 border-primary text-primary"
                      }>
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </div>
            {/* DROP ZONE */}
            <div className={`flex-[1]`}>
              <Card>
                <Grid
                  width={"w-full"}
                  height={"h-full"}
                  direction={"flex-col"}
                  alignItems={"items-center"}
                  justifyContent={"justify-center"}>
                  <div
                    ref={dropZone}
                    className={`w-full h-full text-center font-semibold flex items-center justify-center`}>
                    DROP HERE
                  </div>
                </Grid>
              </Card>
            </div>
          </Grid>

          {/* BOTTOM */}
          <Grid
            width={"w-full"}
            height={"h-fit"}
            direction={"flex-row"}>
            {/* ORIGINAL IMAGE */}
            <div className={`flex-[1]`}>
              <Card>
                <canvas
                  ref={oCanvas}
                  className={`aspect-square w-full`}></canvas>
              </Card>
            </div>
            {/* MUTATED IMAGE */}
            <div className={`flex-[1]`}>
              <Card>
                <canvas
                  ref={mCanvas}
                  className={`aspect-square w-full`}></canvas>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
