import type { DragEvent } from "react";
import { useRows, useCols, useSquareSize } from "../store/board";
import Square from "./square";
import { type KV } from "../App";
import { Armchair } from "lucide-react";

// function getGridClassName(cols: number) {
//   // used to generate tailwind css classname
//   // example:
//   // hanjoyo@debian:~/Documents/workspace/project/map-layout$ npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
//   if (cols === 1) {
//     return "grid-cols-[repeat(1,56px)]";
//   } else if (cols === 2) {
//     return "grid-cols-[repeat(2,56px)]";
//   } else if (cols === 3) {
//     return "grid-cols-[repeat(3,56px)]";
//   } else if (cols === 4) {
//     return "grid-cols-[repeat(4,56px)]";
//   } else if (cols === 5) {
//     return "grid-cols-[repeat(5,56px)]";
//   } else if (cols === 6) {
//     return "grid-cols-[repeat(6,56px)]";
//   } else if (cols === 7) {
//     return "grid-cols-[repeat(7,56px)]";
//   } else if (cols === 8) {
//     return "grid-cols-[repeat(8,56px)]";
//   } else if (cols === 9) {
//     return "grid-cols-[repeat(9,56px)]";
//   } else if (cols === 10) {
//     return "grid-cols-[repeat(10,56px)]";
//   } else if (cols === 11) {
//     return "grid-cols-[repeat(11,56px)]";
//   } else if (cols === 12) {
//     return "grid-cols-[repeat(12,56px)]";
//   } else if (cols === 13) {
//     return "grid-cols-[repeat(13,56px)]";
//   } else if (cols === 14) {
//     return "grid-cols-[repeat(14,56px)]";
//   } else if (cols === 15) {
//     return "grid-cols-[repeat(15,56px)]";
//   } else if (cols === 16) {
//     return "grid-cols-[repeat(16,56px)]";
//   } else if (cols === 17) {
//     return "grid-cols-[repeat(17,56px)]";
//   } else if (cols === 18) {
//     return "grid-cols-[repeat(18,56px)]";
//   } else if (cols === 19) {
//     return "grid-cols-[repeat(19,56px)]";
//   } else if (cols === 20) {
//     return "grid-cols-[repeat(20,56px)]";
//   } else if (cols === 21) {
//     return "grid-cols-[repeat(21,56px)]";
//   } else if (cols === 22) {
//     return "grid-cols-[repeat(22,56px)]";
//   }
//   return "grid-cols-[repeat(5,56px)]";
// }

interface BoardPropsType {
  chairPositions: KV;
  handleDragStart: (ev: DragEvent<HTMLDivElement>, chairIndex: number) => void;
  handleDragOver: (ev: DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: DragEvent<HTMLDivElement>) => void;
}

function Board(props: BoardPropsType) {
  const { chairPositions, handleDragStart, handleDragOver, handleDrop } = props;

  const squares = [];
  const rows = useRows();
  const cols = useCols();
  const size = useSquareSize();

  const renderSqure = (
    row: number,
    col: number,
    size: number,
    chairPositions: KV,
  ) => {
    const isBlack = (row + col) % 2 === 1;
    const index = row * cols + col + 1;
    const keys = Object.keys(chairPositions);
    const isChairHere =
      keys.includes(`${row}`) && chairPositions[row].includes(col);
    const chair = isChairHere ? (
      <div draggable onDragStart={(ev) => handleDragStart(ev, index)}>
        <Armchair />
      </div>
    ) : null;
    return (
      <Square
        key={`${row}${col}-${index}`}
        index={index}
        isBlack={isBlack}
        size={size}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      >
        {isChairHere ? chair : index}
      </Square>
    );
  };

  for (let row = 0; row < rows; ) {
    for (let col = 0; col < cols; ) {
      squares.push(renderSqure(row, col, size, chairPositions));
      col++;
    }
    row++;
  }

  return (
    <div className="m-2">
      <div
        className={`col-start-1 row-start-1 h-svh grid grid-cols-[repeat(${cols},56px)] place-content-start place-items-start gap-1 rounded-lg font-mono text-sm leading-6 font-bold text-white`}
      >
        {squares}
      </div>
    </div>
  );
}

export default Board;
