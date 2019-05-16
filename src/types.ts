import { FidanValue, FidanArray } from "@fidanjs/runtime";

export type GrammarChildsType = "ordered" | "choice" | "value";

export interface IGrammarNode {
  text: FidanValue<string>;
  childsType: FidanValue<GrammarChildsType>;
  childs: FidanArray<IGrammarNode[]>;
  isSelected?: FidanValue<boolean>;
}
