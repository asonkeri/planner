import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "../../App";
import { moveItem } from "../../data";
import { useDragCellItem } from "../../hooks/dragAndDrop";
import { Item } from "../../types";

const CellItemStyle = styled.div`
  width: 10px;
  height: 10px;
  margin: 2px;
  background-color: red;
`;

type Props = Item;
const CellItem = (item: Props) => {
  const handleDrop = (dropResult: Item) => {
    const newItems = moveItem(data, item, dropResult);
    setData(newItems);
  };

  const { data, setData } = useContext(DataContext);
  const { dragRef } = useDragCellItem(item, handleDrop);

  return <CellItemStyle ref={dragRef} />;
};

export default CellItem;
