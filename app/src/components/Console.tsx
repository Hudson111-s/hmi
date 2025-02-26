import { useEffect, useRef, useState } from "react";
import { IconButton, Stack, Typography } from "@mui/joy";
import type { Console } from "../types/console";
import { Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

function Console({ ...props }: Console) {
  const consoleTitle = props.selectedNode
    ? `${props.selectedNode} Messages`
    : "Console";
  const visibility = props.selectedNode ? undefined : { visibility: "hidden" };
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const [socketHistory, setSocketHistory] = useState<string[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const maxHistoryLength = 1000; // in lines

  // update history when receiving new data
  // useEffect(() => {
  //   if (data === null) return;

  //   setSocketHistory((prev: string[]) => {
  //     const time = format(new Date(), "HH:mm:ss.SSS");
  //     const topic = data.topic;
  //     const body = data.msg.data;
  //     const nextMsg = `[${time}] [${topic}]: ${body}`;
  //     const newHistory = [...prev, nextMsg];
  //     if (newHistory.length > maxHistoryLength) {
  //       newHistory.splice(0, 1);
  //     }
  //     return newHistory;
  //   });
  // }, [data]);

  // Console scroll stuff
  useEffect(() => {
    if (!consoleOutputRef.current) return;

    // Keeps the console scrolled at the bottom
    if (autoScroll) {
      const { current } = consoleOutputRef;
      current.scrollTop = current.scrollHeight;
    }

    // Scrolls up when console history is full and more lines get added to prevent it from shifting down
    if (!autoScroll && socketHistory.length === maxHistoryLength) {
      const { current } = consoleOutputRef;
      current.scrollTop -= 14; // 14px represents roughly 1 line
    }
  }, [socketHistory, autoScroll]);

  function checkEnableAutoScroll() {
    if (consoleOutputRef.current) {
      const { current } = consoleOutputRef;
      // this confused me, it's total height - amount scrolled - height of what's visible
      let distFromBottom = current.scrollHeight - current.scrollTop;
      distFromBottom -= current.clientHeight;

      // 10px to add a little bit of margin
      if (distFromBottom < 10) {
        // Re-enable auto scroll when the user scrolls to the bottom
        setAutoScroll(true);
      } else {
        // Disable auto scroll when the user scrolls manually
        setAutoScroll(false);
      }
    }
  }

  function renderConsoleText() {
    let text = socketHistory.join("\n");
    if (text === "") text = "Waiting for messages...";
    if (socketHistory.length === maxHistoryLength) {
      text = `...history limited to ${maxHistoryLength} lines\n${text}`;
    }
    return text;
  }

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={1}
      >
        <Typography>{consoleTitle}</Typography>
        <IconButton
          onClick={props.clearSelectedNode}
          sx={{ borderRadius: 25, ...visibility }}
        >
          <Close />
        </IconButton>
      </Stack>
      <Paper
        ref={consoleOutputRef}
        onScroll={checkEnableAutoScroll}
        sx={{
          bgcolor: "#222",
          height: "60vh",
          color: "#eee",
          p: 1,
          textAlign: "left",
        }}
      >
        <pre style={{ margin: 0, padding: 0 }}>{renderConsoleText()}</pre>
      </Paper>
    </Paper>
  );
}

export default Console;
