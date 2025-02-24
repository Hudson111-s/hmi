import { Box, Stack, Typography } from "@mui/joy";
import type { NodeManager } from "../../types/nodeManager";
import NodeItem from "./NodeItem";
import { Status } from "../../types/status";

function NodeManager({ ...props }: NodeManager) {
  const nodeList = [
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 1"}
      status={Status.Stopped}
    />,
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 2"}
      status={Status.Unknown}
    />,
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 3"}
      status={Status.OK}
    />,
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 4"}
      status={Status.Warning}
    />,
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 5"}
      status={Status.Error}
    />,
    <NodeItem
      setSelectedNode={props.setSelectedNode}
      selection={props.selectedNode}
      name={"Node 6"}
      status={Status.Critical}
    />,
  ];
  return (
    <Stack spacing={1}>
      <Typography>Running Nodes</Typography>
      {nodeList}
    </Stack>
  );
}

export default NodeManager;
