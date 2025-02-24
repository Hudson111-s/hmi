import type { NavBar } from "../../types/navbar";
import EStop from "./EStop";
import StartButton from "./StartButton";
import StatusSummary from "./StatusSummary";
import { Avatar, Box, Sheet, Typography } from "@mui/joy";

function NavBar({ ...props }: NavBar) {
  return (
    <Sheet
      sx={{
        display: "grid",
        gridTemplateColumns: "auto auto", // Two columns: left and right
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "background.surface", // Use Joy UI theme background
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src="/logo192.png" sx={{ mr: 2 }} /> {/* Logo */}
        <Typography level="h4" sx={{ mr: 0.5 }}>
          GRR-inator
        </Typography>
        <Avatar
          src="/lil-guy.png"
          sx={{
            ml: 1,
            borderRadius: 0,
            height: "1.5em",
            width: "1.5em",
            bgcolor: "transparent",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <EStop setStatus={props.setStatus} />
        <StatusSummary status={props.status} />
        <StartButton status={props.status} setStatus={props.setStatus} />
      </Box>
    </Sheet>
  );
}

export default NavBar;
