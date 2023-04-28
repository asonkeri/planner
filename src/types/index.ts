import { DateTime } from "luxon";

export type Item = {
  id: string;
  rowId: string;
  date: DateTime;
};

export type RowData = {
  id: string;
  items: Array<Item>;
};

export type AppData = Array<RowData>;
