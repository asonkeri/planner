import { DateTime } from "luxon";
import { AppData, CellCoordinates, Item } from "../types";

export const createItem = (rowId: string, date: DateTime): Item => {
  const id = String(Math.round(Math.random() * 1000000));
  return { id, rowId, date };
};


export const moveItem = (
  data: AppData,
  item: Item,
  targetCell: CellCoordinates
) => {
  const newItem = { ...item, date: targetCell.date, rowId: targetCell.rowId };
  let newData = addItemToCell(data, newItem, targetCell);
  newData = removeItem(newData, item);
  return newData;
};

export const addItemToCell = (
  data: AppData,
  item: Item,
  { rowId }: CellCoordinates
) => {
  const newData: AppData = data.map((row) => {
    if (row.id === rowId) {
      return { ...row, items: [...row.items, item] };
    }
    return row;
  });
  return newData;
};

export const removeItem = (data: AppData, item: Item) => {
  const shouldNotBeRemoved = (rowItem: Item) =>
    !(
      rowItem.id === item.id &&
      rowItem.rowId === item.rowId &&
      rowItem.date === item.date
    );

  const newData: AppData = data.map((row) => {
    if (row.id === item.rowId) {
      row.items = row.items.filter(shouldNotBeRemoved);
    }
    return row;
  });
  return newData;
};
