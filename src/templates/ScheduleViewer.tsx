import React from "react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsPencil } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";

import { Schedule } from "types/Schedule";
import { getSchedule, removeSchedule } from "apis/APIs";

interface ScheduleViewerProps {
  scheduleID: number;
}

const ScheduleViewer = ({ scheduleID }: ScheduleViewerProps) => {
  const queryClient = useQueryClient();
  const { data: schedule, isLoading } = useQuery(["schedule", scheduleID], () => getSchedule({ id: scheduleID }));

  async function handleClickDelete() {
    await removeSchedule({ id: scheduleID });
    await queryClient.invalidateQueries(["scheduleIDs"]);
  }

  return (
    <Container>
      {isLoading
        ? "..."
        : schedule && (
            <>
              <Schedule>
                {schedule.content}
                <Keyword>at</Keyword>
                {displayDate(schedule)}
              </Schedule>
              <Controls>
                <Button>
                  <BsPencil />
                </Button>
                <Button onClick={handleClickDelete}>
                  <BiTrash />
                </Button>
              </Controls>
            </>
          )}
    </Container>
  );
};

function displayDate(schedule: Schedule) {
  const date = new Date(schedule.unixTime);
  return `${displayNumber(date.getFullYear(), 4)}.${displayNumber(date.getMonth() + 1, 2)}.${displayNumber(
    date.getDate(),
    2
  )}`;
}

function displayNumber(value: number, length: number) {
  return `${value}`.padStart(length, "0");
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  width: 100%;
  min-height: 60px;
  padding: 0 1rem;
  flex-shrink: 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
`;

const Schedule = styled.div`
  width: 100%;
  flex: 1;
  flex-shrink: 0;
`;

const Keyword = styled.span`
  margin: 0 0.3rem;

  color: ${({ theme }) => theme.color.primaryVariant};
`;

const Controls = styled.div`
  flex-shrink: 0;
`;

const Button = styled.button`
  cursor: pointer;

  font-size: 1.2rem;
  font-family: inherit;

  border: 0;
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.color.primaryVariant};
  }

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;

export default ScheduleViewer;
