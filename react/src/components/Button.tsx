import "../css/Button.css";
import StatusIndicator from "./StatusIndicator";
import { ButtonProps } from "../types/button";

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className="Button">
      {<StatusIndicator status={props.status} />}
      {props.name}
    </button>
  );
}

export default Button;
