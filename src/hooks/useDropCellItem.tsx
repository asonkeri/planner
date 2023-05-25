import { DropTargetMonitor, useDrop } from "react-dnd";
import { CellCoordinates, Item } from "../types";
import { DragPayload } from "./useDragCellItem";
import { useState } from "react";

type CollectedProps = {
  isOver: boolean;
};

/**
 * Hook for dropping a cell item on another cell.
 * Handles calling the logic for dropping the item on a drop target and hovering over a drop target.
 * Collects the `isOver` state for styling the currently hovered drop target.
 * @param cell Coordinates of the cell that an item is being dropped on
 * @param handleHover Callback for hovering over a drop target
 * @param handleDrop Callback for dropping an item on a drop target
 * @returns
 */
export const useDropCellItem = (
  cell: CellCoordinates,
  handleHover: (item: Item, cellOffset: number) => void,
  handleDrop: (item: Item, cellOffset: number) => void
) => {
  const [entered, setEntered] = useState(false);

  // Only trigger hover handler once when entering a cell.
  const hover = ({ item, cellOffset }: DragPayload) => {
    if (!entered) {
      handleHover(item, cellOffset);
      setEntered(true);
    }
  };

  // Collect the `isOver` state for styling the currently hovered drop target.
  // Reset the `entered` state when the item is no longer over a drop target.
  const collect = (monitor: DropTargetMonitor<DragPayload>) => {
    const isOver = !!monitor.isOver();
    if (!isOver && entered) {
      setEntered(false);
    }
    return {
      isOver,
    };
  };

  const [{ isOver }, drop] = useDrop<DragPayload, void, CollectedProps>(
    () => ({
      accept: "CELLITEM",
      drop: ({ item, cellOffset }) => {
        handleDrop(item, cellOffset);
      },
      hover,
      collect,
    }),
    [cell]
  );
  return { isOver, drop };
};
