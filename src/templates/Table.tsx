import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getScheduleIDs } from "apis/APIs";
import Row from "templates/Row";

const Table = () => {
  const { data: scheduleIDs, isLoading } = useQuery(["scheduleIDs"], () => getScheduleIDs());

  const noSchedules = !scheduleIDs || scheduleIDs.length === 0;

  return (
    <Container>
      {isLoading ? (
        <Message>Loading...</Message>
      ) : noSchedules ? (
        <Message>No schedules!</Message>
      ) : (
        scheduleIDs.map(id => <Row key={id} scheduleID={id} />)
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  flex: 1;
  border: 4px solid ${({ theme }) => theme.color.primary};
`;

const Message = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding: 0.5rem;
`;

export default Table;
