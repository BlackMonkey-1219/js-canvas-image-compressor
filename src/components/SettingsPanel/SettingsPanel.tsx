import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";
import Card from "../Card/Card";
import Grid from "../Grid/Grid";
import Input from "../Input/Input";
import Button from "../Button/Button";

interface ISettingsPanel {
  widthValue: MutableRefObject<number>;
  heightValue: MutableRefObject<number>;
  imageQuality: MutableRefObject<number>;
  imageType: MutableRefObject<string>;
  resizeFunction: RefObject<(w: number, h: number) => void>;
  downloadFunction: RefObject<(imageType: string, quality: number) => void>;
}

function SettingsPanel(props: ISettingsPanel) {
  const widthInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const imageQualityInput = useRef<HTMLInputElement>(null);
  const imageDownloadTypeInput = useRef<HTMLSelectElement>(null);

  const resizeBtn = useRef<HTMLButtonElement>(null);
  const downloadBtn = useRef<HTMLButtonElement>(null);

  const imageQualityDisplay = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // RESIZE BTN CLICK
    resizeBtn.current!.addEventListener("click", (e) => {
      const width = parseFloat(widthInput.current!.value);
      const height = parseFloat(heightInput.current!.value);

      // RESIZE
      props.resizeFunction.current!(width, height);
    });

    // DOWNLOAD BTN CLICK
    downloadBtn.current!.addEventListener("click", (e) => {
      const imageQuality = parseFloat(imageQualityInput.current!.value);
      const imageType = imageQualityInput.current!.value;

      // DOWNLOAD
      props.downloadFunction.current!(imageType, imageQuality);
    });

    // WIDTH INPUT
    widthInput.current!.addEventListener("input", (e) => {
      const inputElement = e.currentTarget as HTMLInputElement;
      props.widthValue.current = parseFloat(inputElement.value);
    });

    // HEIGHT INPUT
    heightInput.current!.addEventListener("input", (e) => {
      const inputElement = e.currentTarget as HTMLInputElement;
      props.heightValue.current = parseFloat(inputElement.value);
    });

    // IMAGE QUALITY INPUT
    imageQualityInput.current!.addEventListener("input", (e) => {
      const slider = e.currentTarget as HTMLInputElement;
      imageQualityDisplay.current!.value = slider.value;

      // SET IMAGE DOWNLOAD QUALITY
      props.imageQuality.current = parseFloat(slider.value);
    });

    // IMAGE TYPE INPUT
    imageDownloadTypeInput.current!.addEventListener("input", (e) => {
      const selector = e.currentTarget as HTMLSelectElement;

      // SET IMAGE DOWNLOAD TYPE
      props.imageType.current = selector.value;
    });
  }, []);

  return (
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
            refLink={widthInput}
            width={"w-full"}
            placeholder={`WIDTH`}
          />
          <span>X</span>
          <Input
            refLink={heightInput}
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
            ref={imageQualityDisplay}
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
            ref={imageQualityInput}
            type={"range"}
            className={`w-full`}
            min={0.1}
            max={1.0}
            step={0.1}
            defaultValue={0.6}
          />
          <Button
            refLink={resizeBtn}
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
              ref={imageDownloadTypeInput}
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
              color={"bg-secondary border-2 border-primary text-primary"}>
              Download
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SettingsPanel;
