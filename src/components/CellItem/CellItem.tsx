import styled from "@emotion/styled";
import { useContext } from "react";
import { DataContext } from "../../App";
import { moveItem } from "../../data";
import { useDragCellItem } from "../../hooks/dragAndDrop";
import { CellCoordinates } from "../../types";
import { LaneItem } from "../../data/itemLaneCalculator";

type CellItemStyleProps = { days: number; lane: number };
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
  // Styles for making the item appear in the correct lane
  ({ lane }: CellItemStyleProps) => ({
    top: `${lane * 40 + 5}px`,
  }),
  // Styles for making the item span multiple days
  ({ days }: CellItemStyleProps) => ({
    position: "absolute",
    left: 0,
    right: `${days * -100 + 100}%}`,
  })
);

type Props = LaneItem;
const CellItem = ({ lane, ...item }: Props) => {
  const handleDrop = (dropResult: CellCoordinates) => {
    const newItems = moveItem(data, item, dropResult);
    setData(newItems);
  };

  const { data, setData } = useContext(DataContext);
  const { dragRef } = useDragCellItem(item, handleDrop);
  const days = item.endDate.diff(item.startDate, "days").days + 1;

  return (
    <CellItemStyle days={days} ref={dragRef} lane={lane}>
      {item.id}({days})
    </CellItemStyle>
  );
};

export default CellItem;
