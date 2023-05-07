import styled from "@emotion/styled";
import { MouseEventHandler, useContext } from "react";
import { DataContext, DragContext } from "../../context";
import { createItem } from "../../data";
import { RowsViewModel } from "../../data/RowsViewModel";
import { useDropCellItem } from "../../hooks";
import { CellCoordinates, Item } from "../../types";
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

type CellStyleProps = { isOver?: boolean; isDragging?: boolean };
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
  z-index: ${({ isDragging }) => (isDragging ? 1 : "auto")};
`;

type Props = CellCoordinates & { items: Item[] };
export const Cell = ({ rowId, date, items, lane }: Props) => {
  const cell = { rowId, date, lane };
  const dataContext = useContext(DataContext);
  const { isDragging } = useContext(DragContext);
  const { isOver, drop } = useDropCellItem(cell);

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
    <CellStyle
      ref={drop}
      isDragging={isDragging}
      isOver={isOver}
      onClick={handleClick}
    >
      {cellItems.map((item) => (
        <CellItem key={item.id} item={item} cell={cell} />
      ))}
    </CellStyle>
  );
};
