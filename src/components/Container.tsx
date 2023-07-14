import { ContainerProps } from "@/utils/interfaces";
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1100px;
  margin: 30px auto 0;
`;
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
