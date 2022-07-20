import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getScheduleIDs } from "apis/APIs";
import Row from "templates/Row";

const Table = () => {
  const { data: scheduleIDs, isLoading } = useQuery(["scheduleIDs"], () => getScheduleIDs());

  return (
    <Container>
      {isLoading ? <Loading>Loading...</Loading> : scheduleIDs?.map(id => <Row key={id} scheduleID={id} />)}
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
  border: 3px solid ${({ theme }) => theme.color.primary};
`;

const Loading = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding: 0.5rem;
`;

export default Table;
