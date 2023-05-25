import styled from "@emotion/styled";
import { useRef } from "react";
import { DragPreviewImage, useDragDropManager } from "react-dnd";
import { useDragCellItem } from "../../hooks";
import { Item } from "../../types";

// Transparent 1x1 pixel image for the drag preview
const emptyImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NgAAIAAAUAAR4f7BQAAAAASUVORK5CYII=";

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

type Props = { item: Item; handleCancel: (item: Item) => void };
const CellItem = ({ item, handleCancel }: Props) => {
  const dragItemRef = useRef<HTMLDivElement>(null);
  const { dragRef, preview } = useDragCellItem(item, handleCancel, dragItemRef);

  const days = item.endDate.diff(item.startDate, "days").days + 1;
  const isDragging = useDragDropManager().getMonitor().isDragging();

  return (
    <>
      <DragPreviewImage connect={preview} src={emptyImage} />
      <div style={{ width: "100%", height: "100%" }} ref={dragItemRef}>
        <CellItemStyle days={days} ref={dragRef} isDragging={isDragging}>
          {item.id}({days})(Z: {isDragging ? "unset" : 1})
        </CellItemStyle>
      </div>
    </>
  );
};

export default CellItem;
