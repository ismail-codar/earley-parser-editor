import { value } from "@fidanjs/runtime";
import { INode } from "./types";
import { sampleData } from "./data/sample-data";
export const ROOT_NODE = value<INode>(null);

ROOT_NODE(sampleData());
