import styled from "@emotion/styled";
import { Interval } from "luxon";
import { Cell } from "../Cell/Cell";

const RowStyle = styled.div`
  display: flex;
  background-color: white;
`;

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
};

const Row = ({ interval, id }: Props) => {
  const days = interval.splitBy({ day: 1 });
  return (
    <RowStyle>
      <RowHeader>Row ({id})</RowHeader>
      {days.map((day) => {
        const { start } = day;
        if (!start) {
          return null;
        }
        return <Cell key={start.toISODate()} rowId={id} date={start} />;
      })}
    </RowStyle>
  );
};

export default Row;
