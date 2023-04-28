import { AppData } from "../App";
import { CellData } from "../CellItem/CellItem";

export const moveItem = (
  data: AppData,
  sourceCell: CellData,
  targetCell: CellData
) => {
  let newData = addItemToCell(data, targetCell);
  newData = removeItemFromCell(newData, sourceCell);
  return newData;
};

export const addItemToCell = (data: AppData, { rowId, date }: CellData) => {
  const newData: AppData = data.map((row) => {
    if (row.id === rowId) {
      const id = String(Math.round(Math.random() * 10000));
      return {
        ...row,
        items: [...row.items, { id, date }],
      };
    }
    return row;
  });
  return newData;
};

export const removeItemFromCell = (
  data: AppData,
  { rowId, date }: CellData
) => {
  const newData: AppData = data.map((row) => {
    if (row.id === rowId) {
      row.items = row.items.filter((item) => !item.date.hasSame(date, "day"));
    }
    return row;
  });
  return newData;
};
