import { Status } from "../types/status";

export function isRunning(status: Status) {
  if (status === Status.Unknown) return false;
  if (status === Status.Stopped) return false;
  return true;
}
