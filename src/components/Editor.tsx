import { Node } from "./Node";
import { value, FidanArray } from "@fidanjs/runtime";
import { ROOT_NODE } from "../store";
import { Graph } from "./webcola-graph/Graph";
import { INode } from "../types";
import { jsxArrayMap } from "@fidanjs/jsx";
import "./editor.scss";

const nodeList = (data: INode): INode[] => {
  const nodes = [];

  let childs = [data];
  while (childs.length > 0) {
    const child = childs.shift();
    const text = child.text();
    if (!nodes.find(n => n.text() === text)) {
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
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Alt Elemenları</th>
          </tr>
        </thead>
        <tbody
          {...jsxArrayMap(nodes, node => {
            if (!node.childs) return "";
            return (
              <tr>
                <td>{node.text}</td>
                <td>
                  <span
                    {...jsxArrayMap(node.childs, child => {
                      return (
                        <span>
                          <Node
                            childsType={child.childsType}
                            text={child.text}
                          />
                          <span>
                            {node.childsType() === "choice" ? (
                              <span> | </span>
                            ) : (
                              <span> - </span>
                            )}
                          </span>
                        </span>
                      ) as any;
                    })}
                  />
                  <button className={"btn-small"}>+</button>
                </td>
              </tr>
            ) as any;
          })}
        />
      </table>
      <Graph />
    </div>
  );
};
