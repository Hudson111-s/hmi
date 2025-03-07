import { Avatar, IconButton } from "@mui/joy";
import { Status } from "../../types/status";
import type { EStop } from "../../types/navbar";

function EStop({ ...props }: EStop) {
  function onClick() {
    console.log(props.setStatus(Status.Stopped));
  }

  return (
    <IconButton
      onClick={onClick}
      sx={{
        padding: 0,
        borderRadius: 25,
        borderWidth: "2px",
        borderStyle: "inset",
      }}
    >
      <Avatar src="/estop.png">STOP</Avatar>
    </IconButton>
  );
}

export default EStop;
