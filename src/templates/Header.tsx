import React from "react";
import styled from "@emotion/styled";
import { BiNotepad } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

import Link from "components/Link";
import { fadeInStyle } from "styles/Mixins";

const Header = () => (
  <Container>
    <Logo>
      <BiNotepad />
    </Logo>
    <Title>My schedules</Title>
    <CodeLink href="https://github.com/Avantgarde95/simple-schedule-app">
      <FaGithub /> Code
    </CodeLink>
  </Container>
);

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

const CodeLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: auto;
  margin-right: 0.3rem;
  font-family: inherit;
  font-size: 1.2rem;
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.color.primaryVariant};
  }

  & > svg {
    margin-right: 0.5rem;
  }
`;

export default Header;
