import React from "react";
import styled from "@emotion/styled";
import { BiNotepad } from "react-icons/bi";

import { fadeInStyle } from "styles/Mixins";

const Header = () => (
  <Container>
    <Logo>
      <BiNotepad />
    </Logo>
    <Title>My schedules</Title>
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

export default Header;
