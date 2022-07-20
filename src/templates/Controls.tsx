import React from "react";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";

import { createSchedule, removeAllSchedules } from "apis/APIs";
import { disableBrowserHighlight } from "styles/Mixins";

const Controls = () => {
  const queryClient = useQueryClient();

  async function handleClickCreate() {
    await createSchedule();
    await queryClient.invalidateQueries(["scheduleIDs"]);
  }

  async function handleClickRemoveAll() {
    await removeAllSchedules();
    await queryClient.invalidateQueries(["scheduleIDs"]);
  }

  return (
    <Container>
      <Button onClick={handleClickCreate}>Create</Button>
      <Button onClick={handleClickRemoveAll}>Remove all</Button>
    </Container>
  );
};

const Container = styled.div`
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

export default Controls;
