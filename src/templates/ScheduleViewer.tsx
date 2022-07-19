import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getSchedule } from "apis/APIs";

interface ScheduleViewerProps {
  scheduleID: number;
}

const ScheduleViewer = ({ scheduleID }: ScheduleViewerProps) => {
  const { data: schedule, isLoading } = useQuery(["schedule", scheduleID], () => getSchedule({ id: scheduleID }));

  return <Container>{isLoading ? "..." : schedule?.content}</Container>;
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 60px;
  padding: 0 1rem;
  flex-shrink: 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
`;

export default ScheduleViewer;
