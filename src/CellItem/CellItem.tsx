import styled from "@emotion/styled";
import { DateTime } from "luxon";
import { useContext } from "react";
import { ItemsContext } from "../App";
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
    const newItems = moveItem(items, cell, dropResult);
    setItems(newItems);
  };

  const { items, setItems } = useContext(ItemsContext);
  const { dragRef } = useDragCellItem(cell, handleDrop);

  return <CellItemStyle ref={dragRef} />;
};

export default CellItem;
