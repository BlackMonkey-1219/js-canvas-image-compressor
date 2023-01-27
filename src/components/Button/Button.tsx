import React from "react";

interface IButton {
  refLink: React.RefObject<HTMLButtonElement>;
  children: string | React.ReactElement | React.ReactElement[];
  width: "w-fit" | "w-full";
  color:
    | "bg-primary text-white"
    | "bg-secondary border-2 border-primary text-primary";
}

function Button(props: IButton) {
  return (
    <button
      ref={props.refLink}
      className={`${props.width} h-fit px-3 py-2 ${props.color} font-semibold rounded-md`}>
      {props.children}
    </button>
  );
}

export default Button;
