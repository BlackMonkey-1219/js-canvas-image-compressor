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
  const qualityInput = useRef<HTMLInputElement>(null);
  const downloadQualityDisplay = useRef<HTMLInputElement>(null);
  const downloadTypeInput = useRef<HTMLSelectElement>(null);

  const mutateBtn = useRef<HTMLButtonElement>(null);
  const downloadBtn = useRef<HTMLButtonElement>(null);

  const oCanvas = useRef<HTMLCanvasElement>(null);
  const mCanvas = useRef<HTMLCanvasElement>(null);
  const dropZone = useRef<HTMLDivElement>(null);

  const oic = useRef<Canvas | null>();
  const mic = useRef<Canvas | null>();
  const imageList = useRef<FileList | null>();

  const downloadQuality = useRef<number>(0.6);
  const downloadType = useRef<string>("");

  useEffect(() => {
    mutateBtn.current!.addEventListener("click", (e) => {
      mutate();
    });

    downloadBtn.current!.addEventListener("click", (e) => {
      download();
    });

    qualityInput.current!.addEventListener("input", (e) => {
      const slider = e.currentTarget as HTMLInputElement;
      downloadQualityDisplay.current!.value = slider.value;
      downloadQuality.current = parseFloat(slider.value);
    });

    downloadTypeInput.current!.addEventListener("input", (e) => {
      const selector = e.currentTarget as HTMLSelectElement;
      console.log(selector.value);

      downloadType.current = selector.value;
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
    dropZone.current!.addEventListener("dragleave", (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.current!.innerText = "DROP HERE";
    });
    dropZone.current!.addEventListener("drop", (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dropZone.current!.innerText = "DROP HERE";
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

  function download() {
    console.log(downloadType.current);

    if (downloadType.current == "") {
      alert(`SELECT A IMAGE TYPE TO DOWNLOAD`);
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.download =
      imageList.current![0].name.split(".")[0] +
      "." +
      downloadType.current.split("/")[1];
    downloadLink.href = mic.current?.saveImage(
      downloadType.current!,
      downloadQuality.current
    )!;
    downloadLink.click();
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
                  <Grid
                    width={"w-full"}
                    height={"h-fit"}
                    direction={"flex-row"}
                    alignItems={`items-center`}
                    justifyContent={`justify-between`}>
                    <span>Quality</span>
                    <input
                      ref={downloadQualityDisplay}
                      type={`text`}
                      defaultValue={0.6}
                      disabled={true}
                      className={`w-[3rem] h-fit p-2 border-2 rounded-md text-center`}
                    />
                  </Grid>
                  <Grid
                    width={"w-full"}
                    height={"h-fit"}
                    direction={`flex-col`}
                    alignItems={"items-center"}
                    justifyContent={`justify-between`}>
                    <input
                      ref={qualityInput}
                      type={"range"}
                      className={`w-full`}
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      defaultValue={0.6}
                    />
                    <Button
                      refLink={mutateBtn}
                      width={"w-full"}
                      color={"bg-primary text-white"}>
                      MUTATE
                    </Button>
                    <Grid
                      width={`w-full`}
                      height={`h-fit`}
                      direction={`flex-row`}
                      alignItems={`items-center`}
                      justifyContent={`justify-between`}>
                      <select
                        ref={downloadTypeInput}
                        defaultValue={`dummy`}
                        className={`w-full h-fit p-3 rounded-md border-2`}>
                        <option
                          value="dummy"
                          disabled={true}>
                          Select Image Type
                        </option>
                        <option value="image/jpg">JPG</option>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WEBP</option>
                      </select>
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
