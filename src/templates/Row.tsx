import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsPencil } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

import { Schedule as Schedule } from "types/Schedule";
import { getSchedule, removeSchedule, updateSchedule } from "apis/APIs";

type Mode = "View" | "Edit";

interface RowProps {
  initialMode?: Mode;
  scheduleID: number;
}

const Row = ({ initialMode = "View", scheduleID }: RowProps) => {
  const { data: schedule, isLoading } = useQuery(["schedule", scheduleID], () => getSchedule({ id: scheduleID }));
  const [mode, setMode] = useState<Mode>(initialMode);

  function handleOpenEdit() {
    setMode("Edit");
  }

  function handleOpenSave() {
    setMode("View");
  }

  return (
    <Container>
      {isLoading
        ? "..."
        : schedule &&
          (mode === "View" ? (
            <Viewer schedule={schedule} onOpenEdit={handleOpenEdit} />
          ) : (
            <Editor schedule={schedule} onOpenSave={handleOpenSave} />
          ))}
    </Container>
  );
};

interface ViewerProps {
  schedule: Schedule;
  onOpenEdit: () => void;
}

const Viewer = ({ schedule, onOpenEdit }: ViewerProps) => {
  const queryClient = useQueryClient();

  const date = new Date(schedule.unixTime);

  async function handleClickDelete() {
    await removeSchedule({ id: schedule.id });
    await queryClient.invalidateQueries(["scheduleIDs"]);
  }

  return (
    <>
      <Schedule>
        {schedule.content}
        <Keyword>at</Keyword>
        {displayDate(date)}
      </Schedule>
      <Controls>
        <Button onClick={onOpenEdit}>
          <BsPencil />
        </Button>
        <Button onClick={handleClickDelete}>
          <BiTrash />
        </Button>
      </Controls>
    </>
  );
};

interface EditorProps {
  schedule: Schedule;
  onOpenSave: () => void;
}

const Editor = ({ schedule, onOpenSave }: EditorProps) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState(schedule.content);
  const [date, setDate] = useState(displayDate(new Date(schedule.unixTime)));

  function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
  }

  async function save() {
    await updateSchedule({ id: schedule.id, content, unixTime: new Date(date).getTime(), importance: "Normal" });
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
    <>
      <Schedule>
        <Input type="text" value={content} onChange={handleContentChange} onKeyUp={handleKeyUp} />
        <Keyword>at</Keyword>
        <Input type="date" value={date} onChange={handleDateChange} onKeyUp={handleKeyUp} />
      </Schedule>
      <Controls>
        <Button onClick={handleClickSave}>
          <AiOutlineSave />
        </Button>
      </Controls>
    </>
  );
};

function displayDate(date: Date) {
  return `${displayNumber(date.getFullYear(), 4)}-${displayNumber(date.getMonth() + 1, 2)}-${displayNumber(
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
  align-items: center;

  width: 100%;
  min-height: 60px;
  padding: 0 1rem;
  flex-shrink: 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.primary};
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

  color: ${({ theme }) => theme.color.primaryVariant};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
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

export default Row;
