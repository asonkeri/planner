import { useDrag } from "react-dnd";
import { Item } from "../types";

/**
 * Hook for dragging a cell item to another cell.
 * Passes the dragged Item as drag data.
 * All drop and hover logic happens in the drop target.
 * @param item Item that is dragged
 * @returns
 */
export const useDragCellItem = (item: Item) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "CELLITEM",
      item: item,
    }),
    []
  );

  return { dragRef };
};
