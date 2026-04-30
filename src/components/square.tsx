import { type ReactNode, type DragEvent } from "react";

interface SquareProps {
  index: number;
  isBlack: boolean;
  size: number;
  children: ReactNode;
  handleDragOver: (ev: DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: DragEvent<HTMLDivElement>) => void;
}
function Square(props: SquareProps) {
  const { children, index, isBlack, handleDragOver, handleDrop } = props;
  const className = isBlack
    ? "bg-fuchsia-500 text-white"
    : "bg-white text-black";
  return (
    <div
      data-index={index}
      className={`flex h-14 w-14 items-center justify-center rounded-lg ${className} p-4`}
      onDragOver={(ev) => {
        handleDragOver(ev);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

export default Square;
