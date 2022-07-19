import React from "react";
import styled from "@emotion/styled";
import { FaClipboardList } from "react-icons/fa";

import { fadeInStyle } from "styles/Mixins";

const Header = () => (
  <Container>
    <FaClipboardList />
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
  font-size: 1.5rem;
`;

const Title = styled.div`
  margin-left: 0.5rem;
`;

export default Header;
