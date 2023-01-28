import React, { useEffect, useRef } from "react";
import Card from "../Card/Card";
import Grid from "../Grid/Grid";

interface IDropZone {
  setImageFilesFunction: React.Dispatch<Array<File>>;
}

function DropZone(props: IDropZone) {
  const dropZone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // FILES DRAG OVER EVENT FOR STYLING
    dropZone.current!.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const divElement = e.currentTarget as HTMLDivElement;
      divElement.innerText = "OK DROP";
      divElement.style.backgroundColor = "#c4c4c4";
      divElement.style.color = "#ffffff";
    });

    // FILE DRAG END EVENT FOR STYLING
    dropZone.current!.addEventListener("dragend", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const divElement = e.currentTarget as HTMLDivElement;
      divElement.innerText = "DROP HERE";
      divElement.style.backgroundColor = "#ffffff";
      divElement.style.color = "#444444";
    });

    // FILE DROP EVENT
    dropZone.current!.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const divElement = e.currentTarget as HTMLDivElement;
      divElement.innerText = "OK DROP";
      divElement.style.backgroundColor = "#ffffff";
      divElement.style.color = "#000000";

      let fileArray: Array<File> = [];
      for (let i = 0; i < e.dataTransfer!.files.length; i++) {
        fileArray.push(e.dataTransfer!.files[i]);
      }

      props.setImageFilesFunction(fileArray);
    });
  }, []);

  return (
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
  );
}

export default DropZone;
