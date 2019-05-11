import { sampleData } from "../data/sample-data";
import { nodeToGraph } from "../components/graph/util";

export const TEST1 = () => {
  const graph = nodeToGraph(sampleData());
  graph.nodes.forEach(node => {});
  console.log(graph);
  return graph;
};
