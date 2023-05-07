import styled from "@emotion/styled";
import { DateTime, Interval } from "luxon";
import { CommonCellStyle } from "../Cell/Cell";
import { RowHeader } from "../Row/Row";

const RowStyle = styled.div`
  display: flex;
  border: 1px solid #888;
  margin: -1px;
`;

type Props = {
  children?: React.ReactNode;
  interval: Interval;
};

const HeaderRow = ({ interval }: Props) => {
  const days = interval.splitBy({ day: 1 });
  return (
    <RowStyle>
      <RowHeader>HeaderRow</RowHeader>
      {days.map((day) => {
        const start = day.start as DateTime;
        const isoDate = start.toISODate();
        return <CommonCellStyle key={isoDate}>{isoDate}</CommonCellStyle>;
      })}
    </RowStyle>
  );
};

export default HeaderRow;
