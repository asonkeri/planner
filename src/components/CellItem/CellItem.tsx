import styled from "@emotion/styled";
import { useContext } from "react";
import { moveItem } from "../../data";
import { useDragCellItem } from "../../hooks/dragAndDrop";
import { CellCoordinates, Item } from "../../types";
import { DataContext } from "../../context";

type CellItemStyleProps = { days: number };
const CellItemStyle = styled.div(
  {
    height: "30px",
    margin: "0.25rem",
    backgroundColor: "lightblue",
    border: "1px solid black",
    borderRadius: "0.25rem",
    cursor: "pointer",
    zIndex: 1, // Item must be grabbable on the part that is spanning another cell
  },
  // Styles for making the item span multiple days
  ({ days }: CellItemStyleProps) => ({
    position: "absolute",
    left: 0,
    right: `${days * -100 + 100}%}`,
  })
);

type Props = Item;
const CellItem = (item: Props) => {
  const handleDrop = (dropResult: CellCoordinates) => {
    const newItems = moveItem(data, item, dropResult);
    setData(newItems);
  };

  const { data, setData } = useContext(DataContext);
  const { dragRef } = useDragCellItem(item, handleDrop);
  const days = item.endDate.diff(item.startDate, "days").days + 1;

  return (
    <CellItemStyle days={days} ref={dragRef}>
      {item.id}({days})
    </CellItemStyle>
  );
};

export default CellItem;
