import React from "react";
import styled from "@emotion/styled";

import { Childable } from "types/Mixins";
import Header from "templates/Header";

type PageProps = Childable;

const Page = ({ children }: PageProps) => (
  <Container>
    <Header />
    <Content>{children}</Content>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.background};
`;

const Content = styled.main`
  box-sizing: border-box;

  width: 100%;
  padding: 1rem;
`;

export default Page;
