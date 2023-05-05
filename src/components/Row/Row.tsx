import styled from "@emotion/styled";
import { DateTime, Interval } from "luxon";
import { Item } from "../../types";
import { Cell } from "../Cell/Cell";
import { getLanes } from "../../data/itemLaneCalculator";

const RowStyle = styled.div(
  {
    display: "flex",
    transition: "height 0.2s ease-in-out",
    borderTop: "1px solid #888",
    marginTop: "-1px",
  },
  // Row height is dynamic based on the number of lanes
  ({ lanes }: { lanes: number }) => ({
    height: `${lanes * 60}px`,
  })
);

const RowHeader = styled.div`
  width: 150px;
  padding-left: 10px;
  border-right: 1px solid #888;
  margin-right: -1px;
`;

const LaneStyle = styled.div`
  display: flex;
`;

type Props = {
  children?: React.ReactNode;
  interval: Interval;
  id: string;
  items: Item[];
};

const Row = ({ interval, id, items }: Props) => {
  const days = interval.splitBy({ day: 1 }).map((day) => day.start as DateTime);
  const { lanes } = getLanes(items);

  return (
    <RowStyle lanes={lanes.length}>
      <RowHeader>Row ({id})</RowHeader>
      <div>
        {lanes.map((lane, index) => (
          <LaneStyle key={index}>
            {days.map((day) => (
              <Cell key={day.toISODate()} rowId={id} date={day} items={lane} />
            ))}
          </LaneStyle>
        ))}
      </div>
    </RowStyle>
  );
};

export default Row;
