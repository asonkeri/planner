import { useDrag } from "react-dnd";
import { Item } from "../types";

/**
 * Hook for dragging a cell item to another cell.
 * Passes the dragged Item as drag data.
 * Handles calling the logic for dropping the item outside of a drop target.
 * @param item Item that is dragged
 * @returns
 */
export const useDragCellItem = (
  item: Item,
  handleCancel: (item: Item) => void
) => {
  const [, dragRef, preview] = useDrag(
    () => ({
      type: "CELLITEM",
      item: item,
      end(draggedItem, monitor) {
        if (!monitor.didDrop()) {
          handleCancel(draggedItem);
        }
      },
    }),
    []
  );

  return { dragRef, preview };
};
