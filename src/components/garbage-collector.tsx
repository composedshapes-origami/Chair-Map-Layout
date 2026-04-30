import { Trash2 } from "lucide-react";
import type { DragEvent } from "react";

interface GarbageCollectorPropsType {
  handleDragOver: (ev: DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: DragEvent<HTMLDivElement>) => void;
}
export default function GarbageCollector(props: GarbageCollectorPropsType) {
  const { handleDrop, handleDragOver } = props;
  return (
    <div
      className="w-12 h-12 m-5 pt-1 rounded-md bg-red-600 text-white"
      data-index={0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Trash2 size={38} color="white" className="button-icon mx-auto my-auto" />
    </div>
  );
}
