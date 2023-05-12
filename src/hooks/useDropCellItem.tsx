import { DropTargetMonitor, useDrop } from "react-dnd";
import { Item, CellCoordinates } from "../types";

type CellItemDropTargetMonitor = DropTargetMonitor<Item, void>;

/**
 * Hook for dropping a cell item on another cell.
 * Returns the target cell coordinates for use in `monitor.getDropResult()` in `endDrag` handler.
 * Collects the `isOver` state for styling the currently hovered drop target.
 * @param cell Coordinates of the cell that an item is being dropped on
 * @returns
 */
export const useDropCellItem = (
  cell: CellCoordinates,
  handleHover: (item: Item) => void,
  handleDrop: (item: Item) => void
) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CELLITEM",
      drop: (item) => {
        handleDrop(item);
      },
      hover(item) {
        handleHover(item);
      },
      collect: (monitor: CellItemDropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [cell]
  );
  return { isOver, drop };
};
