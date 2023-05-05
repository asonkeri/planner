import { createContext } from "react";
import { AppData } from "../types";

/**
 * DataContext
 * Keeps track of the data in the app.
 */

type DataContextType = { data: AppData; setData: (data: AppData) => void };
const initialContext = {
  data: [],
  setData: () => {
    throw new Error("setData() not implemented");
  },
};
export const DataContext = createContext<DataContextType>(initialContext);
