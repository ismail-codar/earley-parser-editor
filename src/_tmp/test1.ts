import { sampleData } from "../data/sample-data";
import { nodeToGraph } from "../components/webcola-graph/util";

export const TEST1 = () => {
  const graph = nodeToGraph(sampleData());
  console.log(graph);
  return graph;
};
