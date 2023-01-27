import React from "react";

interface IGrid {
  width: "w-fit" | "w-full";
  height: "h-fit" | "h-full";
  direction: "flex-row" | "flex-col";
  alignItems?: "items-start" | "items-center" | "items-end";
  justifyContent?:
    | "justify-start"
    | "justify-center"
    | "justify-end"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
  children: React.ReactElement | React.ReactElement[];
}

function Grid(props: IGrid) {
  return (
    <div
      className={`${props.width} ${props.height} flex gap-4 ${props.direction} ${props.alignItems} ${props.justifyContent}`}>
      {props.children}
    </div>
  );
}

export default Grid;
