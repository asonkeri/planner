import { DataContextType } from "../context/DataContext";
import { Item, CellCoordinates, RowData } from "../types";
import { getLanes } from "./itemLaneCalculator";

export class RowsViewModel {
  private context: DataContextType;

  constructor(context: DataContextType) {
    this.context = context;
  }

  getRowItems(rowId: string) {
    return this.context.data.find((row) => row.id === rowId)?.items ?? [];
  }

  getRowLanes(rowId: string) {
    return getLanes(this.getRowItems(rowId));
  }

  addItem(item: Item, targetCell: CellCoordinates) {
    const newData = this._addItem(item, targetCell);
    this.context.setData(newData);
  }

  removeItem(item: Item) {
    const newData = this._removeItem(item);
    this.context.setData(newData);
  }

  moveItem(
    item: Item,
    sourceCell: CellCoordinates,
    targetCell: CellCoordinates
  ) {
    if (this._isSameCell(sourceCell, targetCell)) return;

    const newItem = {
      ...item,
      rowId: targetCell.rowId,
      startDate: targetCell.date,
      endDate: targetCell.date.plus(item.endDate.diff(item.startDate, "days")),
    };
    let data = this._removeItem(item);
    data = this._addItem(newItem, targetCell);
    this.context.setData(data);
  }

  private _isSameCell(cell1: CellCoordinates, cell2: CellCoordinates) {
    return (
      cell1.rowId === cell2.rowId &&
      cell1.lane === cell2.lane &&
      cell1.date.equals(cell2.date)
    );
  }

  private _addItem(item: Item, targetCell: CellCoordinates) {
    const newData = [...this.context.data];

    // Transform the row items into lanes
    // and insert the new item to the beginning of the target lane
    const lanes = this.getRowLanes(targetCell.rowId);
    if (lanes.length <= targetCell.lane) {
      lanes.push([]);
    }
    lanes[targetCell.lane].splice(0, 0, item);

    // Flatten the lanes back into a single array of row items
    // and update the row
    const newRowItems: Item[] = lanes.reduce(
      (items, lane) => [...items, ...lane],
      []
    );
    const row = newData.find((row) => row.id === targetCell.rowId) as RowData;
    row.items = newRowItems;
    return newData;
  }

  private _removeItem(item: Item) {
    return this.context.data.map((row) => {
      if (row.id === item.rowId) {
        row.items = row.items.filter((rowItem) => rowItem.id !== item.id);
      }
      return row;
    });
  }
}
