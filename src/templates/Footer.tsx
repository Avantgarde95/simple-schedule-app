import React from "react";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSchedule, removeAllSchedules } from "apis/APIs";
import { disableBrowserHighlight } from "styles/Mixins";

const Footer = () => {
  const queryClient = useQueryClient();

  const { mutate: runCreate, isLoading: isCreating } = useMutation(() => createSchedule(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduleIDs"]);
    },
  });

  const { mutate: runRemove, isLoading: isRemoving } = useMutation(() => removeAllSchedules(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduleIDs"]);
    },
  });

  function handleClickCreate() {
    runCreate();
  }

  function handleClickRemoveAll() {
    runRemove();
  }

  return (
    <Container>
      <Button onClick={handleClickCreate} disabled={isCreating}>
        {isCreating ? "Creating..." : "Create"}
      </Button>
      <Button onClick={handleClickRemoveAll} disabled={isRemoving}>
        {isRemoving ? "Removing..." : "Remove all"}
      </Button>
    </Container>
  );
};

const Container = styled.footer`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;

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

  &[disabled] {
    color: ${({ theme }) => theme.color.background};
  }

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.color.secondary};
  }
`;

export default Footer;
