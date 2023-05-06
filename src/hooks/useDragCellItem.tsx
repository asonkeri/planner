import { DragSourceMonitor, useDrag } from "react-dnd";
import { Item, CellCoordinates } from "../types";
import { useIsDragging } from "./useIsDragging";

type CellItemDragSourceMonitor = DragSourceMonitor<Item, Item>;

/**
 * Hook for dragging a cell item to another cell.
 * Sets the `DragContext` with the current dragging state.
 * @param item Item that is dragged
 * @param handleDrop Callback for when the item is dropped
 * @returns
 */
export const useDragCellItem = (
  item: Item,
  handleDrop: (dropResult: CellCoordinates) => void
) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "CELLITEM",
      item: item,
      collect: (monitor: CellItemDragSourceMonitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (_item, monitor: CellItemDragSourceMonitor) => {
        const dropResult = monitor.getDropResult<CellCoordinates>();
        if (dropResult) {
          handleDrop(dropResult);
        }
      },
    }),
    [handleDrop]
  );

  // Update DragContext
  useIsDragging(isDragging);

  return { dragRef };
};
