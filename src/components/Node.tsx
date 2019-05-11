import { FidanValue, compute } from "@fidanjs/runtime";
import { ChildsType } from "../types";

export const Node = (props: {
  text: FidanValue<string>;
  childsType: FidanValue<ChildsType>;
}) => {
  return (
    <input
      type="text"
      className={"node-" + props.childsType}
      value={props.text()}
      onInput={e => props.text(e.target["value"])}
    />
  );
};
