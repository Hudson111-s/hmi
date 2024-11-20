import { Status } from "types/button";

function StatusIndicator(props: { status?: Status }) {
  return <>{props.status && <span className={props.status} />}</>;
}

export default StatusIndicator;
