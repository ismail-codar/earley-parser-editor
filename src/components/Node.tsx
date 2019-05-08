import "./node.scss";
import { FidanValue } from "@fidanjs/runtime";

export const Node = (props: {
  text: string;
  childsType: FidanValue<"ordered" | "choice">;
}) => {
  return (
    <button className={"btn-small node-" + props.childsType}>
      {props.text}
    </button>
  );
};
