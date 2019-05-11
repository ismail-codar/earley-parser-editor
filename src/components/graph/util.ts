import { INode } from "../../types";

interface IGraphNode {
  name: string;
  width: number;
  height: number;
  nodeFill: string;
  labelFill: string;
}

export const nodeToGraph = (
  data: INode
): {
  nodes: IGraphNode[];
  links: {
    source: number;
    target: number;
  }[];
} => {
  const nodes: IGraphNode[] = [];
  const links = [];

  let childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
    const childsType = child.childsType();
    nodes.push({
      name: child.text(),
      width: child.text().length * 10,
      height: 20,
      nodeFill:
        childsType == "choice"
          ? "purple"
          : childsType === "ordered"
          ? "green"
          : "navy",
      labelFill: "white"
    });
    if (child.childs) {
      childs.push.apply(childs, child.childs());
    }
  }

  childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
    const childsType = child.childsType();
    if (child.childs) {
      const nodeIdx = nodes.findIndex(n => n.name === child.text());
      const child_childs = child.childs();
      child_childs.forEach((c, i) => {
        links.push({
          source: nodeIdx,
          target: nodeIdx + i + 1
        });
      });
      childs.push.apply(childs, child_childs);
    }
  }

  return { nodes, links };
};
