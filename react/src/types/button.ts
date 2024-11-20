import { Status } from "./status";

export type ButtonProps = {
  name: string;
  onClick?: () => void;
  status?: Status;
};
