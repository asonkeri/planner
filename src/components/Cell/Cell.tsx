import styled from "@emotion/styled";
import { MouseEventHandler, useContext } from "react";
import { DataContext } from "../../context";
import { createItem } from "../../data";
import { RowsViewModel } from "../../data/RowsViewModel";
import { useDropCellItem } from "../../hooks";
import { CellCoordinates, Item } from "../../types";
import { PlaceholderItem } from "../CellItem/PlaceholderItem";
import CellItem from "../CellItem/CellItem";

export const CommonCellStyle = styled.div`
  width: 100px;
  min-height: 60px;
  padding: 0.25rem;
  text-align: center;
  border: 0 solid #888;
  border-right-width: 1px;
  margin-right: -1px;
  :last-of-type {
    border-right-width: 0;
  }
`;

type CellStyleProps = { isOver?: boolean };
const borderHilightColor = "lightblue";
const CellStyle = styled(CommonCellStyle)<CellStyleProps>`
  padding-bottom: 1rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-items: flex-start;
  box-shadow: ${({ isOver }) =>
    isOver &&
    `4px 0 0 0 ${borderHilightColor}, 0 4px 0 0 ${borderHilightColor}, 4px 4px 0 0 ${borderHilightColor},4px 0 0 0 ${borderHilightColor} inset, 0 4px 0 0 ${borderHilightColor} inset;`};
`;

type Props = CellCoordinates & { items: Item[] };
export const Cell = ({ rowId, date, items, lane }: Props) => {
  const cell: CellCoordinates = { rowId, date, lane };
  const dataContext = useContext(DataContext);

  const handleHover = (item: Item) => {
    // TODO: Add placeholder cellitem to the current cell
    console.log("hover", item.id);
  };

  const handleDrop = (item: Item) => {
    rowsViewModel.moveItem(item, cell);
  };

  const { isOver, drop } = useDropCellItem(cell, handleHover, handleDrop);

  const rowsViewModel = new RowsViewModel(dataContext);

  const handleClick: MouseEventHandler = (event) => {
    // Only react to clicks on the cell itself, not on the items inside
    if (event.target === event.currentTarget) {
      const item = createItem(rowId, date, 2);
      rowsViewModel.addItem(item, cell);
    }
  };

  const cellItems = items.filter((item) => item.startDate.hasSame(date, "day"));

  return (
    <CellStyle ref={drop} isOver={isOver} onClick={handleClick}>
      {cellItems.map((item) => (
        <>
          <CellItem key={item.id} item={item} />
          <PlaceholderItem key={item.id} item={item} />
        </>
      ))}
    </CellStyle>
  );
};
