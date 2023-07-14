import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;
}

export interface ModalProps {
  id: string;
  name: string;
}
export interface ButtonProps {
  variant: "blue" | "red" | "green" | "yellow" | "orange" | "gray";
  onClick?: () => void;
  text?: string;
  type?: string;
}
export interface TitleProps {
  text?: string;
}

export interface ContainerProps {
  children: ReactNode;
}
