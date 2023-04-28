import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { CellCoordinates, Item } from "../types";

type CellItemDragSourceMonitor = DragSourceMonitor<Item, Item>;
type CellItemDropTargetMonitor = DropTargetMonitor<Item, CellCoordinates>;

export const useDropCellItem = (cell: CellCoordinates) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CELLITEM",
      drop: () => cell,
      collect: (monitor: CellItemDropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [cell]
  );
  return { isOver, drop };
};

export const useDragCellItem = (
  item: Item,
  handleDrop: (dropResult: CellCoordinates) => void
) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "CELLITEM",
      item: item,
      end: (_item, monitor: CellItemDragSourceMonitor) => {
        const dropResult = monitor.getDropResult<CellCoordinates>();
        if (dropResult) {
          handleDrop(dropResult);
        }
      },
    }),
    [handleDrop]
  );
  return { dragRef };
};
