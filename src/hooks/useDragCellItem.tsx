import { DragSourceMonitor, useDrag } from "react-dnd";
import { Item } from "../types";

/**
 * Payload for the drag operation.
 * @param item Item being dragged
 * @param cellOffset Number of cells to the right of the initial cell where the dragging started
 */
export type DragPayload = {
  item: Item;
  cellOffset: number;
};

/**
 * Calculates the horizontal cell offset for the dragged item.
 * In other words: how many cells to the right from the initial cell did the dragging start from.
 * @returns number of cells to the right of the initial cell
 */
const getHorizontalCellOffset = (
  monitor: DragSourceMonitor<DragPayload>,
  dragItemRef: React.RefObject<HTMLElement>
) => {
  const dragItemBounds = dragItemRef.current?.getBoundingClientRect();
  const initialClientOffset = monitor.getInitialClientOffset();

  if (dragItemBounds === undefined || initialClientOffset === null) {
    return 0;
  }

  const { x: itemOffsetX } = initialClientOffset;
  const offsetX = itemOffsetX - dragItemBounds.left;
  const cellOffset = Math.floor(offsetX / dragItemBounds.width);
  return cellOffset;
};

/**
 * Hook for dragging a cell item to another cell.
 * Handles calling the logic for dropping the item outside of a drop target.
 * @param item Item that is dragged
 * @param handleCancel Callback for cancelling the drag operation
 * @param dragItemRef Ref to the element that is being dragged
 * @returns
 */
export const useDragCellItem = (
  item: Item,
  handleCancel: (item: Item) => void,
  dragItemRef: React.RefObject<HTMLElement>
) => {
  const [, dragRef, preview] = useDrag<DragPayload>(
    () => ({
      type: "CELLITEM",
      item: (monitor) => ({
        item,
        cellOffset: getHorizontalCellOffset(monitor, dragItemRef),
      }),
      end(dragPayload, monitor) {
        if (!monitor.didDrop()) {
          handleCancel(dragPayload.item);
        }
      },
    }),
    []
  );

  return { dragRef, preview };
};
