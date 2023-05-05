import { createContext } from "react";

/**
 * DragContext
 * Keeps track of whether a drag is in progress.
 */

type DragContextType = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
};
const initialContext = {
  isDragging: false,
  setIsDragging: () => {
    throw new Error("setIsDragging() not implemented");
  },
};
export const DragContext = createContext<DragContextType>(initialContext);
