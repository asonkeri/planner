import styled from "@emotion/styled";
import { Item } from "../../types";
import { CellItemStyle } from "./CellItem";

const PlaceholderItemStyle = styled(CellItemStyle)({
  backgroundColor: "lightgray",
  cursor: "default",
  borderStyle: "dashed",
});

type Props = { item: Item };
/**
 * Renders a placeholder item that is shown when dragging an item.
 * The placeholder acts as an indicator of where the item will be dropped.
 * @param item Item
 * @returns
 */
export const PlaceholderItem = ({ item }: Props) => {
  const days = item.endDate.diff(item.startDate, "days").days + 1;
  return <PlaceholderItemStyle days={days} isDragging={true} />;
};
