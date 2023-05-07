import { DateTime } from "luxon";

export type CellCoordinates = {
  rowId: string;
  lane: number;
  date: DateTime;
};

export type Item = {
  id: string;
  rowId: string;
  startDate: DateTime;
  endDate: DateTime;
};

export type RowData = {
  id: string;
  items: Array<Item>;
};

export type AppData = Array<RowData>;
