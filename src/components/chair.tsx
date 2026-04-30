import { type DragEvent } from "react";
import { Armchair, PlusIcon } from "lucide-react";

interface ChairPropsType {
  chairIndex: number;
  handleDragStart: (ev: DragEvent<HTMLDivElement>, chairIndex: number) => void;
}

function Chair(props: ChairPropsType) {
  const { handleDragStart } = props;
  return (
    <div
      className="w-12 h-12 m-5"
      onDragStart={(ev) => handleDragStart(ev, 0)}
      draggable
    >
      <Armchair x={0} y={0} size={38} className="button-icon mx-auto my-auto">
        <PlusIcon color="red" size={9} x={17} y={0} />
      </Armchair>
    </div>
  );
}

export default Chair;
