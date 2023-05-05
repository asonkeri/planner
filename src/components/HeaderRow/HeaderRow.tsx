import styled from "@emotion/styled";
import { Interval } from "luxon";
import { CommonCellStyle } from "../Cell/Cell";

const RowStyle = styled.div`
  display: flex;
  border: 1px solid #888;
  margin: -1px;
`;

const RowHeader = styled.div`
  width: 150px;
  padding-left: 10px;
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
        const isoDate = day.start?.toISODate() ?? "bla";
        return <CommonCellStyle key={isoDate}>{isoDate}</CommonCellStyle>;
      })}
    </RowStyle>
  );
};

export default HeaderRow;
