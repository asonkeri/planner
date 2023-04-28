import styled from "@emotion/styled";
import { Interval } from "luxon";
import { Item } from "../../types";
import { Cell } from "../Cell/Cell";
import { getLanes } from "../../data/itemLaneCalculator";

const RowStyle = styled.div(
  {
    display: "flex",
    transition: "height 0.2s ease-in-out",
  },
  // Row height is dynamic based on the number of lanes
  ({ lanes }: { lanes: number }) => ({
    height: `${lanes * 40 + 30}px`,
  })
);

const RowHeader = styled.div`
  width: 150px;
  padding-left: 10px;
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
`;

type Props = {
  children?: React.ReactNode;
  interval: Interval;
  id: string;
  items: Item[];
};

const Row = ({ interval, id, items }: Props) => {
  const days = interval.splitBy({ day: 1 });
  const { lanes, itemsWithLanes } = getLanes(items);

  return (
    <RowStyle lanes={lanes}>
      <RowHeader>Row ({id})</RowHeader>
      {days.map((day) => {
        const { start } = day;
        return (
          start && (
            <Cell
              key={start.toISODate()}
              rowId={id}
              date={start}
              items={itemsWithLanes}
            />
          )
        );
      })}
    </RowStyle>
  );
};

export default Row;
