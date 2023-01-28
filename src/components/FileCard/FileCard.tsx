import React from "react";
import Grid from "../Grid/Grid";

interface IFileCard {
  index: number;
  fileName: string;
  fileType: string;
  onClickFunction: (index: number) => void;
}

function FileCard(props: IFileCard) {
  function clickHandler() {
    props.onClickFunction(props.index);
  }

  return (
    <div
      onClick={clickHandler}
      className={`w-full h-fit p-1 border-b-2 hover:bg-slate-300 cursor-pointer`}>
      <Grid
        width={"w-full"}
        height={"h-fit"}
        direction={`flex-row`}
        alignItems={`items-center`}
        justifyContent={`justify-between`}>
        <div
          className={`w-[50%] h-[1rem] leading-[1] overflow-hidden text-ellipsis`}>
          {props.fileName}
        </div>
        <div className={`w-[50%] text-right`}>{props.fileType}</div>
      </Grid>
    </div>
  );
}

export default FileCard;
