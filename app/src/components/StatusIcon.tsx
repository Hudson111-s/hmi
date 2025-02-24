import { Circle } from "@mui/icons-material";
import { StatusColors, type StatusIcon } from "../types/status";
import { SxProps } from "@mui/material";

function StatusIcon({ ...props }: StatusIcon) {
  const color = StatusColors[props.status];
  const defaultSx: SxProps = { height: ".5em", width: ".5em", ml: 1 };
  return <Circle htmlColor={color} sx={{ ...defaultSx, ...props.sx }} />;
}

export default StatusIcon;
