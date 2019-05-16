import { value } from "@fidanjs/runtime";
import { IGrammarNode } from "./types";
import { grammarTr } from "./grammar/tr";
export const ROOT_NODE = value<IGrammarNode>(null);

ROOT_NODE(grammarTr());
