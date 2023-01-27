import React from "react";

interface ICard {
  children: string | React.ReactElement | React.ReactElement[];
}

function Card(props: ICard) {
  return (
    <div
      className={`w-full h-full p-2 rounded-md bg-white shadow-[0_5px_5px_-2px_rgba(0,0,0,0.3)]`}>
      {props.children}
    </div>
  );
}

export default Card;
