import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "../../App";
import { addItemToCell } from "../../data";
import { useDropCellItem } from "../../hooks/dragAndDrop";
import CellItem, { CellData } from "../CellItem/CellItem";

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

type Props = CellData;
export const Cell = (cell: Props) => {
  const { data, setData } = useContext(DataContext);
  const { isOver, drop } = useDropCellItem(cell);

  const handleClick = () => {
    const newData = addItemToCell(data, cell);
    setData(newData);
  };

  const rowItems = data.find((item) => item.id === cell.rowId);
  const active = rowItems?.items.some((item) =>
    item.date.hasSame(cell.date, "day")
  );

  return (
    <CellStyle ref={drop} isOver={isOver} onClick={handleClick}>
      {active && <CellItem {...cell} />}
    </CellStyle>
  );
};
