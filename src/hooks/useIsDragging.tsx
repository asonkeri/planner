import { useContext, useEffect } from "react";
import { DragContext } from "../context";

/**
 * Hook for setting the `DragContext` with the current dragging state whenever it changes.
 * @param isDragging
 */
export const useIsDragging = (isDragging: boolean) => {
  const { setIsDragging } = useContext(DragContext);
  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging, setIsDragging]);
};
