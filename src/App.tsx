import { useState, type DragEvent } from "react";
import Board from "./components/board";
import Chair from "./components/chair";
import Size from "./components/size";
import { useCols } from "./store/board";
import "./output.css";
import GarbageCollector from "./components/garbage-collector";

export interface KV {
  [key: number]: number[];
}

function App() {
  const [chairIndex, setChairIndex] = useState<number>(1);
  const [chairPositions, setChairPositions] = useState<KV>({ 0: [0] });
  const cols = useCols();

  const handleDragStart = (
    ev: DragEvent<HTMLDivElement>,
    chairIndex: number,
  ) => {
    ev.dataTransfer.setData("text", `${chairIndex}`);
    setChairIndex(chairIndex + 1);
  };

  const enableDropping = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const that = event.currentTarget;
    const chairDestinationIndexString = that.dataset.index;
    const chairDestinationIndex = chairDestinationIndexString
      ? parseInt(chairDestinationIndexString)
      : 1;
    const newColumn =
      chairDestinationIndex % cols === 0
        ? cols - 1
        : (chairDestinationIndex % cols) - 1;
    const newRow =
      chairDestinationIndex % cols === 0
        ? Math.floor(chairDestinationIndex / cols) - 1
        : Math.floor(chairDestinationIndex / cols);
    const chairSourceIndexString = event.dataTransfer.getData("text");
    const chairSourceIndex = chairSourceIndexString
      ? parseInt(chairSourceIndexString)
      : 1;
    const column =
      chairSourceIndex % cols === 0 ? cols - 1 : (chairSourceIndex % cols) - 1;
    const row =
      chairSourceIndex % cols === 0
        ? Math.floor(chairSourceIndex / cols) - 1
        : Math.floor(chairSourceIndex / cols);

    setChairPositions((prev) => {
      const newChairPositions = { ...prev };
      if (chairDestinationIndex === 0) {
        if (chairSourceIndex === 0) return { ...newChairPositions };
        const filtered = Object.keys(newChairPositions).reduce(
          (obj: KV, key) => {
            const keyInteger = parseInt(key);
            if (keyInteger === row)
              obj[keyInteger] = [
                ...newChairPositions[keyInteger].filter(
                  (p: number) => p !== column,
                ),
              ];
            return obj;
          },
          newChairPositions,
        );
        return { ...filtered };
      }
      if (chairSourceIndex === 0) {
        const newChairPosition: KV = {};
        if (Object.hasOwn(newChairPositions, newRow)) {
          newChairPosition[newRow] = [...newChairPositions[newRow], newColumn];
        } else {
          newChairPosition[newRow] = [newColumn];
        }
        const merged = Object.assign({}, newChairPositions, newChairPosition);
        return { ...merged };
      } else {
        const filtered = Object.keys(newChairPositions).reduce(
          (obj: KV, key) => {
            const keyInteger = parseInt(key);
            if (keyInteger === row)
              obj[keyInteger] = [
                ...newChairPositions[keyInteger].filter(
                  (p: number) => p !== column,
                ),
              ];
            else if (keyInteger === newRow)
              obj[keyInteger] = [...newChairPositions[keyInteger], newColumn];
            else {
              obj[keyInteger] = [...newChairPositions[keyInteger]];
            }
            return obj;
          },
          newChairPositions,
        );
        if (Object.hasOwn(newChairPositions, newRow))
          filtered[newRow] = [...newChairPositions[newRow], newColumn];
        else {
          filtered[newRow] = [newColumn];
        }
        return { ...filtered };
      }
    });
    console.log(`Somebody dropped a chair index: ${chairDestinationIndex}`);
  };

  return (
    <div className="flex w-svw h-svh">
      <div className="w-fit svh">
        <Chair chairIndex={chairIndex} handleDragStart={handleDragStart} />
        <GarbageCollector
          handleDrop={handleDrop}
          handleDragOver={enableDropping}
        />
      </div>
      <div className="w-full h-svh">
        <div className="flex items-start border-b border-black">
          <Size />
          <span className="ml-15 my-auto text-md leading-10 font-extrabold">
            Chair Map Layout
          </span>
        </div>
        <Board
          chairPositions={chairPositions}
          handleDragStart={handleDragStart}
          handleDragOver={enableDropping}
          handleDrop={handleDrop}
        />
      </div>
    </div>
  );
}

export default App;
