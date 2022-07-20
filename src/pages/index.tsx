import React from "react";
import styled from "@emotion/styled";

import Header from "templates/Header";
import Table from "templates/Table";
import Footer from "templates/Footer";

const HomePage = () => (
  <Container>
    <Header />
    <Content>
      <Table />
    </Content>
    <Footer />
  </Container>
);

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 1rem;

  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.background};
`;

const Content = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  // Fix overflow.
  min-height: 0;
  flex: 1;
`;

export default HomePage;
