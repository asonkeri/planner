import styled from "@emotion/styled";
import { Interval } from "luxon";
import { CommonCellStyle } from "../Cell/Cell";

const RowStyle = styled.div`
  display: flex;
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
