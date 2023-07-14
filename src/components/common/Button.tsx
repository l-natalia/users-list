import { ButtonProps } from "@/utils/interfaces";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  padding: 6px 18px;
  background-color: ${(props) => props.variant};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  text,
  type = "button",
}) => {
  return (
    <StyledButton variant={variant} onClick={onClick} type={type}>
      {text}
    </StyledButton>
  );
};

export default Button;
