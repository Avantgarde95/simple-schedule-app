import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { createSchedule, getScheduleIDs, removeAllSchedules } from "apis/APIs";
import ScheduleViewer from "templates/ScheduleViewer";
import { disableBrowserHighlight } from "styles/Mixins";

const ScheduleTable = () => {
  const { data: scheduleIDs, isLoading, refetch } = useQuery<Array<number>>(["scheduleIDs"], () => getScheduleIDs());

  async function handleClickCreate() {
    await createSchedule({
      content: "New schedule",
      unixTime: new Date().getTime(),
      importance: "Normal",
    });

    await refetch();
  }

  async function handleClickRemoveAll() {
    await removeAllSchedules();
    await refetch();
  }

  return (
    <Container>
      <Table>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          scheduleIDs?.map(id => <ScheduleViewer key={id} scheduleID={id} />)
        )}
      </Table>
      <Controls>
        <Button onClick={handleClickCreate}>Create</Button>
        <Button onClick={handleClickRemoveAll}>Remove all</Button>
      </Controls>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  flex: 1;
`;

const Table = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  flex: 1;
  border: 3px solid ${({ theme }) => theme.color.primary};
`;

const Loading = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding: 0.5rem;
`;

const Controls = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  width: 100%;
  padding-top: 1rem;
`;

const Button = styled.button`
  ${disableBrowserHighlight};

  cursor: pointer;

  width: 100%;
  height: 2.5rem;
  font-family: inherit;
  font-size: 1rem;
  border: 0;

  color: ${({ theme }) => theme.color.background};
  background-color: ${({ theme }) => theme.color.primary};

  &:hover {
    background-color: ${({ theme }) => theme.color.primaryVariant};
  }
`;

export default ScheduleTable;
