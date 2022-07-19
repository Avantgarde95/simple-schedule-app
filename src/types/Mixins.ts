import { ReactNode } from "react";

export interface Childable {
  children: ReactNode;
}

export interface Stylable {
  className?: string;
}
