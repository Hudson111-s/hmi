import { Box } from "@mui/joy";
import type { StatusSummary } from "../../types/navbar";
import StatusIcon from "../StatusIcon";

function StatusSummary({ ...props }: StatusSummary) {
  return (
    <Box
      sx={{
        ml: 2,
        bgcolor: "#eee",
        paddingY: 1,
        paddingX: 2,
        borderRadius: 25,
      }}
    >
      Status: {props.status}
      <StatusIcon status={props.status} />
    </Box>
  );
}

export default StatusSummary;
