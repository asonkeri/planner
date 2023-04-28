import styled from "@emotion/styled";
import { DateTime } from "luxon";
import { useContext } from "react";
import { DataContext } from "../App";
import { moveItem } from "../data";
import { useDragCellItem } from "../DragAndDrop/hooks";

const CellItemStyle = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
`;

export type CellData = { rowId: string; date: DateTime };

type Props = CellData;
const CellItem = (cell: Props) => {
  const handleDrop = (dropResult: CellData) => {
    const newItems = moveItem(data, cell, dropResult);
    setData(newItems);
  };

  const { data, setData } = useContext(DataContext);
  const { dragRef } = useDragCellItem(cell, handleDrop);

  return <CellItemStyle ref={dragRef} />;
};

export default CellItem;
