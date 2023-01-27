import React from "react";

interface IContainer {
  maxWidth:
    | "max-w-screen-sm"
    | "max-w-screen-md"
    | "max-w-screen-lg"
    | "max-w-screen-xl"
    | "max-w-screen-2xl";
  children: React.ReactElement | React.ReactElement[];
}

function Container(props: IContainer) {
  return (
    <div className={`w-full h-fit mx-auto ${props.maxWidth}`}>
      {props.children}
    </div>
  );
}

export default Container;
