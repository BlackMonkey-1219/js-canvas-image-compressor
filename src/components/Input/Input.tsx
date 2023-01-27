import React, { RefAttributes } from "react";

interface IInput {
  width: "w-fit" | "w-full";
  placeholder?: string;
  refLink: React.RefObject<HTMLInputElement>;
}

function Input(props: IInput) {
  return (
    <input
      ref={props.refLink}
      type={"text"}
      placeholder={props.placeholder}
      className={`${props.width} h-fit px-2 py-2 placeholder:text-gray-500 border-[1px] border-gray-400 rounded-md`}
    />
  );
}

export default Input;
