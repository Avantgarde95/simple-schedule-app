import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getScheduleIDs } from "apis/APIs";

const ScheduleTable = () => {
  const { data: scheduleIDs, isLoading } = useQuery<Array<number>>(["scheduleIDs"], getScheduleIDs);

  return <Container>{isLoading ? <Loading>Loading...</Loading> : scheduleIDs?.join(", ")}</Container>;
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 3px solid ${({ theme }) => theme.color.primary};
`;

const Loading = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding: 0.5rem;
`;

export default ScheduleTable;
