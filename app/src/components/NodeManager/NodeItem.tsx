import {
  ChevronRight,
  ChevronRightOutlined,
  ChevronRightRounded,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/joy";
import type { NodeItem } from "../../types/nodeManager";
import StatusIcon from "../StatusIcon";
import { SxProps } from "@mui/material";

function NodeItem({ ...props }: NodeItem) {
  const selected = props.selection === props.name;
  let selectedStatusBorder: SxProps = {};
  if (selected) {
    selectedStatusBorder = {
      border: "2px solid",
      borderColor: "#000",
      borderRadius: 25,
    };
  }

  return (
    <Button
      onClick={() => props.setSelectedNode(props.name)}
      sx={{
        width: "100%",
        borderRadius: 25,
        bgcolor: selected ? "#aaa" : "#eee",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Stack direction="row" alignItems="center">
          <StatusIcon
            status={props.status}
            sx={{ ml: 0, mr: 1, ...selectedStatusBorder }}
          />
          <Typography>{props.name}</Typography>
        </Stack>
        <Box
          sx={{
            height: "1.25em",
            width: "1.25em",
            borderRadius: 10,
            bgcolor: "#ccc",
            alignContent: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <ChevronRightRounded sx={{ width: 1, height: 1, color: "black" }} />
        </Box>
      </Stack>
    </Button>
  );
}

export default NodeItem;
