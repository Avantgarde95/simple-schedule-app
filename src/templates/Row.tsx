import React, { useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getSchedule } from "apis/APIs";
import { Viewer, Editor } from "templates/Schedule";

interface RowProps {
  scheduleID: string;
}

const Row = ({ scheduleID }: RowProps) => {
  const [mode, setMode] = useState<"View" | "Edit">("View");
  const { data: schedule, isLoading } = useQuery(["schedule", scheduleID], () => getSchedule(scheduleID));

  function handleOpenEdit() {
    setMode("Edit");
  }

  function handleOpenSave() {
    setMode("View");
  }

  return (
    <Container>
      {isLoading || !schedule ? (
        <Message>...</Message>
      ) : mode === "View" ? (
        <Viewer schedule={schedule} onOpenEdit={handleOpenEdit} />
      ) : (
        <Editor schedule={schedule} onOpenSave={handleOpenSave} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  flex-shrink: 0;
  border-bottom: 3px solid ${({ theme }) => theme.color.primary};
`;

const Message = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 1rem;
`;

export default Row;
