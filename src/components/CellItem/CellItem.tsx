import styled from "@emotion/styled";
import { useDragDropManager } from "react-dnd";
import { useDragCellItem } from "../../hooks";
import { Item } from "../../types";

type CellItemStyleProps = { days: number; isDragging: boolean };
export const CellItemStyle = styled.div(
  {
    height: "30px",
    margin: "0.25rem",
    backgroundColor: "lightblue",
    border: "1px solid black",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
  ({ isDragging }: CellItemStyleProps) => ({
    zIndex: isDragging ? "unset" : 1,
  }),
  // Styles for making the item span multiple days
  ({ days }: CellItemStyleProps) => {
    const right = `${days * -100 + 100}%`;
    return {
      position: "absolute",
      left: 0,
      right: right,
    };
  }
);

type Props = { item: Item };
const CellItem = ({ item }: Props) => {
  const { dragRef } = useDragCellItem(item);

  const isDragging = useDragDropManager().getMonitor().isDragging();

  const days = item.endDate.diff(item.startDate, "days").days + 1;

  return (
    <CellItemStyle days={days} ref={dragRef} isDragging={isDragging}>
      {item.id}({days})(Z: {isDragging ? "unset" : 1})
    </CellItemStyle>
  );
};

export default CellItem;
