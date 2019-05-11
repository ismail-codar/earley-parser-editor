import { Node } from "./Node";
import { value, FidanArray } from "@fidanjs/runtime";
import { ROOT_NODE } from "../store";
import { Graph } from "./webcola-graph/Graph";
import { INode } from "../types";
import { jsxArrayMap } from "../../.yalc/@fidanjs/jsx/build";

const nodeList = (data: INode): INode[] => {
  const nodes = [];

  let childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
    const text = child.text();
    if (nodes.find(n => n.name === text) === undefined) {
      nodes.push(child);
      if (child.childs) {
        childs.push.apply(childs, child.childs());
      }
    }
  }
  return nodes;
};

export const Editor = () => {
  console.log(JSON.parse(JSON.stringify(ROOT_NODE(), null, 1)));
  const nodes = value(nodeList(ROOT_NODE())) as FidanArray<INode[]>;
  // setTimeout(() => {
  //   nodes()[5].text("YUKLEM_KOK...");
  // }, 2000);
  return (
    <div>
      <Node text="Root" childsType={value("choice")} />
      <Node text="xx" childsType={value("ordered")} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody
          {...jsxArrayMap(
            nodes,
            node =>
              (
                <tr>
                  <td>{node.text()}</td>
                </tr>
              ) as any
          )}
        />
      </table>
      <Graph />
    </div>
  );
};
