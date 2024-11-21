import { useEffect, useState } from "react";
import "css/App.css";
import Button from "components/Button";
import { Status } from "types/status";
import Console from "components/Console";
import { WebSocketProvider } from "components/WebSocketContext";

function App() {
  const [botStatus, setBotStatus] = useState(Status.Offline);

  function startBot() {
    if (botStatus === Status.Ok) return;
    if (botStatus === Status.Offline) {
      setBotStatus(Status.Loading);
      // set to Status.Ok in 5s
    }
  }
  function stopBot() {
    if (botStatus !== Status.Ok) return;
    setBotStatus(Status.Offline);
  }

  useEffect(() => {
    if (botStatus === Status.Loading) {
      const timeoutId = setTimeout(() => {
        setBotStatus(Status.Ok);
      }, 5000);

      return () => clearTimeout(timeoutId); // Cleanup function
    }
  }, [botStatus]);

  return (
    <div className="App">
      <WebSocketProvider>
        <Button name="Start" status={botStatus} onClick={startBot} />
        <Button name="Bad Button" onClick={stopBot} />
        <Console />
      </WebSocketProvider>
    </div>
  );
}

export default App;
