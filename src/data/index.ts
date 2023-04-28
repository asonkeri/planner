import { DateTime } from "luxon";
import { CellData } from "../CellItem/CellItem";

export const parseCellId = (cellId: string) => {
  const regex = RegExp(/row-(\w+)-(\d{4}-\d{2}-\d{2})/);
  const [, rowId, dateString] = regex.exec(cellId) ?? [];
  const date = DateTime.fromISO(dateString);
  return { rowId, date };
};

export const moveItem = (
  items: Record<string, Array<DateTime>>,
  sourceCell: CellData,
  targetCell: CellData
) => {
  let newItems = addItemToCell(items, targetCell);
  newItems = removeItemFromCell(newItems, sourceCell);
  return newItems;
};

export const addItemToCell = (
  items: Record<string, Array<DateTime>>,
  cell: CellData
) => {
  const { rowId, date } = cell;
  const newItems = { ...items };
  newItems[rowId] = [...newItems[rowId], date];
  return newItems;
};

export const removeItemFromCell = (
  items: Record<string, Array<DateTime>>,
  cell: CellData
) => {
  const { rowId, date } = cell;
  const newItems = { ...items };
  newItems[rowId] = newItems[rowId]?.filter(
    (item) => !item.hasSame(date, "day")
  );
  return newItems;
};
