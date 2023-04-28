import styled from "@emotion/styled";
import { MouseEventHandler, useContext } from "react";
import { DataContext } from "../../App";
import { addItemToCell, createItem } from "../../data";
import { useDropCellItem } from "../../hooks/dragAndDrop";
import { CellCoordinates } from "../../types";
import CellItem from "../CellItem/CellItem";

export const CommonCellStyle = styled.div`
  width: 100px;
  min-height: 40px;
  padding: 0.25rem;
  text-align: center;
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
`;

type CellStyleProps = { isOver?: boolean };
const CellStyle = styled(CommonCellStyle)<CellStyleProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: ${({ isOver }) => (isOver ? 1 : "auto")};
  box-shadow: ${({ isOver }) =>
    isOver &&
    "2px 0 0 0 #f00, 0 2px 0 0 #f00, 2px 2px 0 0 #f00,2px 0 0 0 #f00 inset, 0 2px 0 0 #f00 inset;"};
`;

type Props = CellCoordinates;
export const Cell = (cell: Props) => {
  const { data, setData } = useContext(DataContext);
  const { isOver, drop } = useDropCellItem(cell);

  const handleClick: MouseEventHandler = (event) => {
    // Only react to clicks on the cell itself, not on the items inside
    if (event.target === event.currentTarget) {
      const item = createItem(cell.rowId, cell.date);
      const newData = addItemToCell(data, item, cell);
      setData(newData);
    }
  };

  const rowData = data.find((item) => item.id === cell.rowId);
  const cellItems = rowData
    ? rowData.items.filter((item) => item.date.hasSame(cell.date, "day"))
    : [];

  return (
    <CellStyle ref={drop} isOver={isOver} onClick={handleClick}>
      {cellItems.map((item) => (
        <CellItem key={item.id} {...item} />
      ))}
    </CellStyle>
  );
};
