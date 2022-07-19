import React from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import { getScheduleIDs } from "apis/APIs";
import ScheduleViewer from "templates/ScheduleViewer";

const ScheduleTable = () => {
  const { data: scheduleIDs, isLoading } = useQuery<Array<number>>(["scheduleIDs"], () => getScheduleIDs());

  return (
    <Table>
      {isLoading ? <Loading>Loading...</Loading> : scheduleIDs?.map(id => <ScheduleViewer key={id} scheduleID={id} />)}
    </Table>
  );
};

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

export default ScheduleTable;
