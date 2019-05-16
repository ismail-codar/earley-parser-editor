import { IGrammarNode } from "../types";
import { value } from "@fidanjs/runtime";

export const nodeList = (rootNode: IGrammarNode): IGrammarNode[] => {
  const nodes = [];

  let childs = [rootNode];
  while (childs.length > 0) {
    const child = childs.shift();
    child.isSelected = value(false);
    const text = child.text();
    if (!nodes.find(n => n.text() === text)) {
      nodes.push(child);
      if (child.childs) {
        child.childs().forEach(c => {
          childs.push(c);
        });
      }
    }
  }
  return nodes;
};

export const earleyString = (rootNode: IGrammarNode) => {
  const nodes = nodeList(rootNode);
  const str = nodes
    .map(node => {
      if (node.childs && node.childs()) {
        return (
          node.text() +
          " -> " +
          node
            .childs()
            .map(child => child.text())
            .join(node.childsType() === "ordered" ? " " : " | ")
        );
      }
      return null;
    })
    .filter(node => node !== null)
    .join("\n");

  return "S -> " + str.substr(str.indexOf("->") + 3);
};
