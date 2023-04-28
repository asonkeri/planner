import styled from "@emotion/styled";
import { useState } from "react";

const RowStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainerLabel = styled.div`
  box-shadow: 2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,
    2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset;
  background-color: lightgray;
  padding: 0.25rem;
`;

type Props = {
  children?: React.ReactNode;
};

const RowContainer = ({ children }: Props) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  return (
    <RowStyle>
      <RowContainerLabel onClick={toggleOpen}>
        {(open ? "▲" : "▼") + " RowContainer"}
      </RowContainerLabel>
      {open ? children : null}
    </RowStyle>
  );
};

export default RowContainer;
