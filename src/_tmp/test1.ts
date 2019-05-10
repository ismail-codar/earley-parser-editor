import { INode } from "../types";
import { sampleData } from "../data/sample-data";

const nodeToGraph = (data: INode) => {
  const nodes = [];
  const links = [];
  //   const links = data.childs().map((c, i) => {
  //     return {
  //       source: 0,
  //       target: i + 1
  //     };
  //   });

  let childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
    nodes.push({
      name: child.text(),
      width: 250,
      height: 40
    });
    if (child.childs) {
      childs.push.apply(childs, child.childs());
    }
  }

  childs = [data];
  while (childs.length > 0) {
    const child = childs.pop();
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

export const TEST1 = () => {
  const graph = nodeToGraph(sampleData());
  console.log(graph);
  return graph;
};
