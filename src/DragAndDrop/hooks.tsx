import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import { CellData } from "../CellItem/CellItem";

type CellItemDragSourceMonitor = DragSourceMonitor<CellData, CellData>;
type CellItemDropTargetMonitor = DropTargetMonitor<CellData, CellData>;

export const useDropCellItem = (cell: CellData) => {
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
  cell: CellData,
  handleDrop: (dropResult: CellData) => void
) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "CELLITEM",
      item: cell,
      end: (_item, monitor: CellItemDragSourceMonitor) => {
        const dropResult = monitor.getDropResult<CellData>();
        if (dropResult) {
          handleDrop(dropResult);
        }
      },
    }),
    [handleDrop]
  );
  return { dragRef };
};
