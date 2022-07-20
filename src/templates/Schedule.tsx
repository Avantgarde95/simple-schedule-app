import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineSave } from "react-icons/ai";

import { Schedule } from "types/Schedule";
import { formatDate } from "utils/StringUtils";
import { removeSchedule, updateSchedule } from "apis/APIs";

interface ViewerProps {
  schedule: Schedule;
  onOpenEdit: () => void;
}

export const Viewer = ({ schedule, onOpenEdit }: ViewerProps) => {
  const queryClient = useQueryClient();

  const { mutate: runDelete, isLoading: isDeleting } = useMutation(() => removeSchedule(schedule.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["scheduleIDs"]);
    },
  });

  const date = new Date(schedule.startTime);

  function handleClickDelete() {
    runDelete();
  }

  return (
    <Container isHighlighted={schedule.isImportant}>
      <Area>
        {schedule.content}
        <Keyword>at</Keyword>
        {formatDate(date)}
      </Area>
      <Controls>
        <Button onClick={onOpenEdit}>
          <BsPencil />
        </Button>
        <Button onClick={handleClickDelete} disabled={isDeleting}>
          {isDeleting ? <CgSandClock /> : <BiTrash />}
        </Button>
      </Controls>
    </Container>
  );
};

interface EditorProps {
  schedule: Schedule;
  onOpenSave: () => void;
}

export const Editor = ({ schedule, onOpenSave }: EditorProps) => {
  const [content, setContent] = useState(schedule.content);
  const [date, setDate] = useState(formatDate(new Date(schedule.startTime)));
  const [isImportant, setImportant] = useState(schedule.isImportant);

  const queryClient = useQueryClient();

  const { mutate: runUpdate, isLoading: isUpdating } = useMutation(
    () =>
      updateSchedule(schedule.id, {
        content,
        isImportant,
        startTime: new Date(date).getTime(),
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["schedule", schedule.id]);
        onOpenSave();
      },
    }
  );

  function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
  }

  function handleImportantChange(event: ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      runUpdate();
    }
  }

  function handleClickUpdate() {
    runUpdate();
  }

  return (
    <Container isHighlighted={isImportant}>
      {isUpdating ? (
        <Area>Updating...</Area>
      ) : (
        <Area>
          <Input type="text" value={content} onChange={handleContentChange} onKeyUp={handleKeyUp} />
          <Keyword>at</Keyword>
          <Input type="date" value={date} onChange={handleDateChange} onKeyUp={handleKeyUp} />
          <Label>
            <input type="checkbox" checked={isImportant} onChange={handleImportantChange} />
            Important
          </Label>
        </Area>
      )}
      <Controls>
        <Button onClick={handleClickUpdate} disabled={isUpdating}>
          {isUpdating ? <CgSandClock /> : <AiOutlineSave />}
        </Button>
      </Controls>
    </Container>
  );
};

interface ContainerProps {
  isHighlighted: boolean;
}

const Container = styled.div<ContainerProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 1rem;

  ${({ isHighlighted, theme }) => isHighlighted && `background-color: ${theme.color.tertiary}`}
`;

const Area = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;

  width: 100%;
  height: 100%;
  flex: 1;
  flex-shrink: 0;
`;

const Keyword = styled.span`
  margin: 0 0.3rem;

  color: ${({ theme }) => theme.color.secondary};
`;

const Input = styled.input`
  min-width: 8rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
`;

const Label = styled.label`
  cursor: pointer;
  user-select: none;

  margin-left: 0.5rem;
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

  &[disabled] {
    color: inherit;
  }

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;
