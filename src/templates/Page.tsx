import React from "react";
import styled from "@emotion/styled";

const Page = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.color.stroke};
  background-color: ${({ theme }) => theme.color.background};
`;

export default Page;
