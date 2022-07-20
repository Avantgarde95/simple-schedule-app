import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsPencil } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

import { Schedule as Schedule } from "types/Schedule";
import { getSchedule, removeSchedule, updateSchedule } from "apis/APIs";

interface RowProps {
  scheduleID: string;
}

const Row = ({ scheduleID }: RowProps) => {
  const { data: schedule, isLoading } = useQuery(["schedule", scheduleID], () => getSchedule(scheduleID));
  const [mode, setMode] = useState<"View" | "Edit">("View");

  function handleOpenEdit() {
    setMode("Edit");
  }

  function handleOpenSave() {
    setMode("View");
  }

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        schedule &&
        (mode === "View" ? (
          <Viewer schedule={schedule} onOpenEdit={handleOpenEdit} />
        ) : (
          <Editor schedule={schedule} onOpenSave={handleOpenSave} />
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  flex-shrink: 0;
  border-bottom: 3px solid ${({ theme }) => theme.color.primary};
`;

const Loading = () => <Area isHighlighted={false}>...</Area>;

interface ViewerProps {
  schedule: Schedule;
  onOpenEdit: () => void;
}

const Viewer = ({ schedule, onOpenEdit }: ViewerProps) => {
  const queryClient = useQueryClient();

  const date = new Date(schedule.startTime);

  async function handleClickDelete() {
    await removeSchedule(schedule.id);
    await queryClient.invalidateQueries(["scheduleIDs"]);
  }

  return (
    <Area isHighlighted={schedule.isImportant}>
      <Schedule>
        {schedule.content}
        <Keyword>at</Keyword>
        {formatDate(date)}
      </Schedule>
      <Controls>
        <Button onClick={onOpenEdit}>
          <BsPencil />
        </Button>
        <Button onClick={handleClickDelete}>
          <BiTrash />
        </Button>
      </Controls>
    </Area>
  );
};

interface EditorProps {
  schedule: Schedule;
  onOpenSave: () => void;
}

const Editor = ({ schedule, onOpenSave }: EditorProps) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState(schedule.content);
  const [date, setDate] = useState(formatDate(new Date(schedule.startTime)));
  const [isImportant, setImportant] = useState(schedule.isImportant);

  function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
  }

  function handleImportantChange(event: ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  async function save() {
    await updateSchedule(schedule.id, {
      content,
      isImportant,
      startTime: new Date(date).getTime(),
    });

    queryClient.invalidateQueries(["schedule", schedule.id]);
    onOpenSave();
  }

  async function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      save();
    }
  }

  async function handleClickSave() {
    await save();
  }

  return (
    <Area isHighlighted={isImportant}>
      <Schedule>
        <Input type="text" value={content} onChange={handleContentChange} onKeyUp={handleKeyUp} />
        <Keyword>at</Keyword>
        <Input type="date" value={date} onChange={handleDateChange} onKeyUp={handleKeyUp} />
        <Label>
          <input type="checkbox" checked={isImportant} onChange={handleImportantChange} />
          Important
        </Label>
      </Schedule>
      <Controls>
        <Button onClick={handleClickSave}>
          <AiOutlineSave />
        </Button>
      </Controls>
    </Area>
  );
};

function formatDate(date: Date) {
  return `${formatNumber(date.getFullYear(), 4)}-${formatNumber(date.getMonth() + 1, 2)}-${formatNumber(
    date.getDate(),
    2
  )}`;
}

function formatNumber(value: number, length: number) {
  return `${value}`.padStart(length, "0");
}

interface AreaProps {
  isHighlighted: boolean;
}

const Area = styled.div<AreaProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0 1rem;

  ${({ isHighlighted, theme }) => isHighlighted && `background-color: ${theme.color.tertiary}`}
`;

const Schedule = styled.div`
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

  &:hover {
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;

export default Row;
