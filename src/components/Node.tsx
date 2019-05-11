import { FidanValue, compute } from "@fidanjs/runtime";
import { ChildsType } from "../types";

export const Node = (props: {
  text: FidanValue<string>;
  childsType: FidanValue<ChildsType>;
}) => {
  return (
    // <input
    //   type="text"
    //   className={compute(() => "node-" + props.childsType())}
    //   value={props.text()}
    //   size={compute(() => props.text().length + 5)}
    //   onInput={e => props.text(e.target["value"])}
    // />
    <span>{props.text()}</span>
  );
};
