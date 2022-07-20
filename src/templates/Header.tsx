import React, { useState } from "react";
import Modal from "react-modal";
import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";
import { BiNotepad } from "react-icons/bi";

import Link from "components/Link";
import { disableBrowserHighlight, fadeInStyle } from "styles/Mixins";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  function handleClickAbout() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <Container>
      <Logo>
        <BiNotepad />
      </Logo>
      <Title>My schedules</Title>
      <Controls>
        <AboutButton onClick={handleClickAbout}>?</AboutButton>
        <CodeLink href="https://github.com/Avantgarde95/simple-schedule-app">{"</>"}</CodeLink>
      </Controls>
      <AboutModal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        Simple schedule app
        <ul>
          <li>Created for practicing some libraries & frameworks</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Emotion: For styling</li>
          <li>Next.js: For SSR</li>
          <li>React Query: For data fetching</li>
        </ul>
        <CloseButton onClick={handleModalClose}>Close</CloseButton>
      </AboutModal>
    </Container>
  );
};

const Container = styled.header`
  ${fadeInStyle};

  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 0.8rem 1rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  line-height: 2rem;
`;

const Title = styled.div`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
`;

const Controls = styled.div`
  margin-left: auto;
  margin-right: 0.3rem;
`;

const createControlStyle = (theme: Theme) => css`
  cursor: pointer;
  text-decoration: none;

  font-family: inherit;
  font-size: 1.3rem;
  color: inherit;
  background-color: transparent;
  border: 0;

  &:hover {
    color: ${theme.color.secondary};
  }
`;

const AboutButton = styled.button`
  ${({ theme }) => createControlStyle(theme)}
`;

const CodeLink = styled(Link)`
  ${({ theme }) => createControlStyle(theme)}

  margin-left: 0.5rem;
`;

const AboutModal = styled(Modal)`
  ${fadeInStyle}

  position: absolute;
  display: flex;
  flex-direction: column;

  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);

  ul {
    padding-left: 1.5rem;
  }
`;

const CloseButton = styled.button`
  ${disableBrowserHighlight};

  cursor: pointer;

  width: 100%;
  height: 2.5rem;
  margin-top: auto;
  font-family: inherit;
  font-size: 1rem;
  border: 0;

  color: ${({ theme }) => theme.color.background};
  background-color: ${({ theme }) => theme.color.primary};

  &:hover {
    background-color: ${({ theme }) => theme.color.secondary};
  }
`;

export default Header;
