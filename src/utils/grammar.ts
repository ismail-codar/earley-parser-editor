import { value, FidanArray } from "@fidanjs/runtime";
import { IGrammarNode, GrammarChildsType } from "../types";

export const choice = (text: string, childs: IGrammarNode[]): IGrammarNode => {
  return {
    text: value(text),
    childsType: value<GrammarChildsType>("choice"),
    childs: value(childs) as FidanArray<IGrammarNode[]>
  };
};

export const ordered = (text: string, childs: IGrammarNode[]): IGrammarNode => {
  return {
    text: value(text),
    childsType: value<GrammarChildsType>("ordered"),
    childs: value(childs) as FidanArray<IGrammarNode[]>
  };
};

export const val = (text: string): IGrammarNode => {
  return {
    text: value(text),
    childsType: value<GrammarChildsType>("value"),
    childs: null
  };
};
