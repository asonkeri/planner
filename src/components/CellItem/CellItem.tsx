import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "../../App";
import { moveItem } from "../../data";
import { useDragCellItem } from "../../hooks/dragAndDrop";
import { CellCoordinates, Item } from "../../types";

const CellItemStyle = styled.div`
  width: 100%;
  margin: 0.25rem;
  background-color: lightblue;
  border-radius: 0.25rem;
  cursor: pointer;
`;

type Props = Item;
const CellItem = (item: Props) => {
  const handleDrop = (dropResult: CellCoordinates) => {
    const newItems = moveItem(data, item, dropResult);
    setData(newItems);
  };

  const { data, setData } = useContext(DataContext);
  const { dragRef } = useDragCellItem(item, handleDrop);

  return <CellItemStyle ref={dragRef}>{item.id}</CellItemStyle>;
};

export default CellItem;
