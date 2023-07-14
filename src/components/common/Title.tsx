import { TitleProps } from "@/utils/interfaces";
import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 30px;
`;

const Title: React.FC<TitleProps> = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default Title;
