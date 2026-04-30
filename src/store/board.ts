import { create } from "zustand";

interface BoardState {
  rows: number;
  cols: number;
  squareSize: number;
}

interface BoardAction {
  setRowNCol: (row: number, col: number, width: number, height: number) => void;
}

type BoardStore = BoardState & BoardAction;

const useStore = create<BoardStore>((set) => ({
  rows: 1,
  cols: 1,
  squareSize: 120,
  setRowNCol: (rows: number, cols: number, width: number, height: number) => {
    const squareHeight = Math.floor(height / cols);
    const squareWidth = Math.floor(width / rows);
    const minimum = squareHeight > squareWidth ? squareWidth : squareHeight;
    set((prev: BoardStore) => ({ ...prev, rows, cols, squareSize: minimum }));
  },
}));

export const useRows = () => useStore((store: BoardStore) => store.rows);
export const useCols = () => useStore((store: BoardStore) => store.cols);
export const useSquareSize = () =>
  useStore((store: BoardStore) => store.squareSize);
export const useSetRowNCol = () =>
  useStore((store: BoardStore) => store.setRowNCol);
