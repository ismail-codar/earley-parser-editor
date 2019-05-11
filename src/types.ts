import { FidanValue, FidanArray } from "@fidanjs/runtime";

export type ChildsType = "ordered" | "choice" | "value";

export interface INode {
  text: FidanValue<string>;
  childsType: FidanValue<ChildsType>;
  childs: FidanArray<INode[]>;
  isSelected?: FidanValue<boolean>;
}
