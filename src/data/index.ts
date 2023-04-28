import { DateTime } from "luxon";
import { AppData, CellCoordinates, Item } from "../types";

export const createItem = (rowId: string, date: DateTime, days = 1): Item => {
  const id = String(Math.round(Math.random() * 1000000));
  return { id, rowId, startDate: date, endDate: date.plus({ days: days - 1 }) };
};

export const moveItem = (
  data: AppData,
  item: Item,
  targetCell: CellCoordinates
) => {
  // If the item is already in the target cell, do nothing
  if (
    item.startDate.equals(targetCell.date) &&
    item.rowId === targetCell.rowId
  ) {
    return data;
  }
  const itemDays = item.endDate.diff(item.startDate, "days").days;
  const newItem: Item = {
    ...item,
    startDate: targetCell.date,
    endDate: targetCell.date.plus({ days: itemDays }),
    rowId: targetCell.rowId,
  };

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
      rowItem.startDate.equals(item.startDate)
    );

  const newData: AppData = data.map((row) => {
    if (row.id === item.rowId) {
      row.items = row.items.filter(shouldNotBeRemoved);
    }
    return row;
  });
  return newData;
};
