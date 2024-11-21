export enum RosDataType {
  String = "std_msgs/String",
}

export type RosSubscriber = {
  topic: string;
  type: RosDataType | string;
};

export type WebSocketContextType = {
  // object for now; temporary
  sendMessage: (msg: object) => void;
  addMessageListener: (callback: (data: any) => void) => () => void;
};

export type SocketResponse = {
  msg: SocketResponseMsg;
  topic: string;
  op: string;
};

export type SocketResponseMsg = {
  data: any;
};
