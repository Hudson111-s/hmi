import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  RosDataType,
  SocketResponse,
  WebSocketContextType,
} from "types/websocket";

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const listeners = useRef<Set<(data: SocketResponse) => void>>(new Set());

  useEffect(() => {
    // if it already exists it already has all this stuff set
    if (socket !== null) return;

    const toSubscribe = [
      { topic: "/topic", type: RosDataType.String },
      { topic: "/topic2", type: RosDataType.String },
    ];

    const _socket = new WebSocket("ws://127.0.0.1:9090");
    _socket.onopen = () => {
      console.log("Connected to ROS bridge");
      toSubscribe.forEach((item) => {
        _socket.send(JSON.stringify({ op: "subscribe", ...item }));
      });
    };

    _socket.onmessage = (event) => {
      const data: SocketResponse = JSON.parse(event.data);
      listeners.current.forEach((listener) => listener(data));
    };

    _socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    _socket.onclose = () => {
      console.log("Socket closed");
      setSocket(null);
    };

    setSocket(_socket);
  }, [socket]);

  function sendMessage(msg: object) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  }

  const addMessageListener = useCallback((callback: (data: any) => void) => {
    listeners.current.add(callback);
    return () => {
      listeners.current.delete(callback);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ sendMessage, addMessageListener }}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Custom hook to use WebSocket data with filtering options
export function useWebSocket(filterOptions: {
  includeTopics?: string[];
  excludeTopics?: string[];
}) {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  const { addMessageListener, sendMessage } = context;
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    function handleData(data: SocketResponse) {
      const { includeTopics, excludeTopics } = filterOptions;
      const topic = data.topic;

      if (includeTopics && !includeTopics.includes(topic)) return;
      if (excludeTopics && excludeTopics.includes(topic)) return;

      setData(data);
    }

    const removeListener = addMessageListener(handleData);
    return removeListener;
  }, [addMessageListener, filterOptions]);

  return { data, sendMessage };
}
