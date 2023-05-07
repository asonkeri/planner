import { DateTime } from "luxon";
import { Item } from "../types";

export const createItem = (rowId: string, date: DateTime, days = 1): Item => {
  const id = String(Math.round(Math.random() * 1000000));
  return { id, rowId, startDate: date, endDate: date.plus({ days: days - 1 }) };
};
