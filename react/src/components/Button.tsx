import { ButtonProps } from "types/button";
import "css/Button.css";
import StatusIndicator from "./StatusIndicator";

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className="Button">
      {<StatusIndicator status={props.status} />}
      {props.name}
    </button>
  );
}

export default Button;
