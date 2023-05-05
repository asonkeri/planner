import styled from "@emotion/styled";
import { useState } from "react";
import { DragContext } from "../../context/DragContext";

const RowStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #888;
  margin: -1px;
`;

const RowContainerLabel = styled.div`
  background-color: lightgray;
  padding: 0.25rem;
`;

type Props = {
  children?: React.ReactNode;
};

const RowContainer = ({ children }: Props) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DragContext.Provider value={{ isDragging, setIsDragging }}>
      <RowStyle>
        <RowContainerLabel onClick={toggleOpen}>
          {(open ? "▲" : "▼") + " RowContainer"}
        </RowContainerLabel>
        {open ? children : null}
      </RowStyle>
    </DragContext.Provider>
  );
};

export default RowContainer;
