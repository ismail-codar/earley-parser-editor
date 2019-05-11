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
    const text = child.text();
    if (nodes.find(n => n.name === text) === undefined) {
      nodes.push({
        name: text,
        width: text.length * 10,
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
  }

  childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
    if (child.childs) {
      const nodeIdx = nodes.findIndex(n => n.name === child.text());
      const child_childs = child.childs();
      child_childs.forEach((c, i) => {
        const childIdx = nodes.findIndex(n => n.name === c.text());
        links.push({
          source: nodeIdx,
          target: childIdx
        });
      });
      childs.push.apply(childs, child_childs);
    }
  }

  return { nodes: nodes.slice(0), links: links.slice(0) };
};
