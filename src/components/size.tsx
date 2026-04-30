import { useRef, type SyntheticEvent } from "react";
import { useSetRowNCol } from "../store/board";

function Size() {
  const setDimension = useSetRowNCol();
  const rowsRef = useRef<HTMLInputElement>(null);
  const colsRef = useRef<HTMLInputElement>(null);
  const handleGenerate = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const rows = rowsRef.current ? parseInt(rowsRef.current.value) : 1;
    const cols = colsRef.current ? parseInt(colsRef.current.value) : 1;
    const width = window.innerWidth - 88;
    const height = window.innerHeight - 42;

    setDimension(rows, cols, width, height);
  };
  return (
    <div className="w-fit h-fit">
      <div className="flex mx-5 my-2">
        <div className="flex">
          <label className="my-auto">Rows:</label>&nbsp;&nbsp;
          <input
            type="text"
            ref={rowsRef}
            onKeyDown={(ev) => {
              if (
                /[\d]/.test(ev.key) ||
                [
                  "Backspace",
                  "Del",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                  "Alt",
                ].includes(ev.key)
              )
                return;
              ev.preventDefault();
            }}
            className="border border-px border-gray-500 rounded-md px-3 py-2 w-16"
          />
        </div>
        <div className="flex ml-3">
          <label className="my-auto">Cols:</label>&nbsp;&nbsp;
          <input
            type="text"
            ref={colsRef}
            onKeyDown={(ev) => {
              if (
                /[\d]/.test(ev.key) ||
                [
                  "Backspace",
                  "Del",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                  "Alt",
                ].includes(ev.key)
              )
                return false;
              ev.preventDefault();
            }}
            className="border border-px border-gray-500 rounded-md px-3 py-2 w-16"
          />
        </div>
        <button
          type="button"
          className="bg-zinc-700 text-white px-3 py-2 border border-gray-600 rounded-md ml-5"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default Size;
