import { createContext } from "react";
import { AppData } from "../types";

/**
 * DataContext
 * For injecting App data and setter function into components.
 */

export type DataContextType = {
  data: AppData;
  setData: (data: AppData) => void;
};
const initialContext = {
  data: [],
  setData: () => {
    throw new Error("setData() not implemented");
  },
};
export const DataContext = createContext<DataContextType>(initialContext);
