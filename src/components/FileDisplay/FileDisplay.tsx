import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import Grid from "../Grid/Grid";
import FileCard from "../FileCard/FileCard";

interface IFileDisplay {
  imageFiles: Array<File>;
  originalImageLoadFunction: (img: HTMLImageElement) => number[] | null;
  mutableImageLoadFunction: (img: HTMLImageElement) => number[] | null;
}

function FileDisplay(props: IFileDisplay) {
  const fileReader = useRef<FileReader>(new FileReader());

  function cardClick(index: number) {
    const file = props.imageFiles[index];

    fileReader.current.onloadend = (e) => {
      const imageDataUrl = e.target?.result;
      console.log(imageDataUrl);

      const image = new Image();
      image.src = imageDataUrl as string;

      props.originalImageLoadFunction(image);
    };

    fileReader.current.readAsDataURL(file);
  }

  return (
    <Card>
      <Grid
        width={`w-full`}
        height={`h-full`}
        direction={`flex-col`}
        alignItems={`items-center`}
        justifyContent={`justify-between`}>
        {props.imageFiles.map((file, index) => {
          return (
            <FileCard
              key={`file_${index}`}
              index={index}
              fileName={file.name}
              fileType={file.type}
              onClickFunction={cardClick}
            />
          );
        })}
      </Grid>
    </Card>
  );
}

export default FileDisplay;
