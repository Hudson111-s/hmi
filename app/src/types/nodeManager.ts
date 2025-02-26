import { Dispatch, SetStateAction } from "react";
import { Status } from "./status";

export type NodeManager = {
  setSelectedNode: Dispatch<SetStateAction<String | null>>;
  selectedNode: String | null;
};

export type NodeItem = {
  setSelectedNode: Dispatch<SetStateAction<String | null>>;
  selection: String | null;
  name: String;
  status: Status;
};
