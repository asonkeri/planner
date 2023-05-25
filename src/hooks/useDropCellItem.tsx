import { useDrop } from "react-dnd";
import { CellCoordinates, Item } from "../types";
import { DragPayload } from "./useDragCellItem";

type CollectedProps = {
  isOver: boolean;
};

/**
 * Hook for dropping a cell item on another cell.
 * Returns the target cell coordinates for use in `monitor.getDropResult()` in `endDrag` handler.
 * Collects the `isOver` state for styling the currently hovered drop target.
 * @param cell Coordinates of the cell that an item is being dropped on
 * @returns
 */
export const useDropCellItem = (
  cell: CellCoordinates,
  handleHover: (item: Item, cellOffset: number) => void,
  handleDrop: (item: Item, cellOffset: number) => void
) => {
  const [{ isOver }, drop] = useDrop<DragPayload, void, CollectedProps>(
    () => ({
      accept: "CELLITEM",
      drop: ({ item, cellOffset }) => {
        handleDrop(item, cellOffset);
      },
      hover({ item, cellOffset }) {
        handleHover(item, cellOffset);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [cell]
  );
  return { isOver, drop };
};
