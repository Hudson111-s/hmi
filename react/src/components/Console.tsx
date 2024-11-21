import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useWebSocket } from "./WebSocketContext";
import "css/Console.css";

function Console() {
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const [socketHistory, setSocketHistory] = useState<string[]>([]);
  const [autoScroll, setAutoScroll] = useState(true);
  const maxHistoryLength = 1000; // in lines
  const { data } = useWebSocket({
    // All the topics we want to subscribe to. This should be pretty
    // much every topic that exists on ros. Currently topic and topic2
    // for testing but it won't error if the topics don't exist.
    includeTopics: ["/topic", "/topic2"],
  });

  // update history when receiving new data
  useEffect(() => {
    if (data === null) return;

    setSocketHistory((prev: string[]) => {
      const time = format(new Date(), "HH:mm:ss.SSS");
      const topic = data.topic;
      const body = data.msg.data;
      const nextMsg = `[${time}] [${topic}]: ${body}`;
      const newHistory = [...prev, nextMsg];
      if (newHistory.length > maxHistoryLength) {
        newHistory.splice(0, 1);
      }
      return newHistory;
    });
  }, [data]);

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
    <div className="Console">
      <h1 className="ConsoleTitle">Console</h1>
      <div
        className="ConsoleBody"
        ref={consoleOutputRef}
        onScroll={checkEnableAutoScroll}
      >
        <pre>{renderConsoleText()}</pre>
      </div>
    </div>
  );
}

export default Console;
