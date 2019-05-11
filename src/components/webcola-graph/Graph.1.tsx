import { LayoutAdaptor } from "./layout-adaptor";
import { inject, value, compute, FidanArray } from "@fidanjs/runtime";
import { jsxArrayMap } from "@fidanjs/jsx";
import "./graph.scss";
import { nodeToGraph } from "./util";
import { sampleData } from "../../data/sample-data";

interface IGraphNode {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  nodeFill?: string;
  labelFill?: string;
}

const GraphNode = (props: IGraphNode) => {
  if (!props.x) return null;
  inject(props);

  return (
    <g>
      <rect
        className="node"
        width={props.width}
        height={props.height}
        fill={props.nodeFill || "blue"}
        rx="3"
        ry="3"
        x={compute(() => props.x - props.width / 2)}
        y={compute(() => props.y - props.height / 2)}
      >
        <title>{props.name}</title>
      </rect>
      <text
        className="label"
        x={props.x}
        y={compute(() => props.y + 5)}
        fill={props.labelFill || "blue"}
      >
        {props.name}
      </text>
    </g>
  );
};

const GraphLink = (props: { source: IGraphNode; target: IGraphNode }) => {
  if (props.source.x === undefined) return null;
  inject(props.source);
  inject(props.target);
  return (
    <line
      className="link"
      x1={props.source.x}
      y1={props.source.y}
      x2={props.target.x}
      y2={props.target.y}
    />
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////
var cola = new LayoutAdaptor(960, 500);

// var graphData = require("./sample-data/fivenodesdisconnected.json");
const graphData = nodeToGraph(sampleData());
// cola
//   .nodes(graphData.nodes)
//   .links(graphData.links)
//   .start();
cola
  .avoidOverlaps(true)
  .size([1200, 800])
  .nodes(graphData.nodes)
  .links(graphData.links)
  .jaccardLinkLengths(70)
  .start();
//////////////////////////////////////////////////////////////////////////////////////////////////
var pt = null;
var svg = null;
const offset = { x: 0, y: 0 };
function cursorPoint(evt) {
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

const initSvg = element => {
  svg = element;
  pt = svg.createSVGPoint();
};

var dragNode: IGraphNode = null;
const onMouseDown = e => {
  const path: Element[] = e["path"].slice();
  while (path.length) {
    var item = path.shift();
    if (item.tagName === "g") {
      dragNode = item["$props"];
      const pt = cursorPoint(e);
      offset.x = pt.x - dragNode.x;
      offset.y = pt.y - dragNode.y;
      LayoutAdaptor.dragStart(dragNode);
      break;
    }
  }
};

const onMouseMove = e => {
  if (!dragNode) return;
  const pt = cursorPoint(e);
  pt.x -= offset.x;
  pt.y -= offset.y;
  LayoutAdaptor.drag(dragNode, pt);
  cola.resume();
};
const onMouseUp = e => {
  dragNode && LayoutAdaptor.dragEnd(dragNode);
  dragNode = null;
};

export const Graph = () => {
  const links = value(graphData.links) as FidanArray<any[]>;
  const nodes = value(graphData.nodes) as FidanArray<any[]>;
  return (
    <div className="graph">
      <svg
        {...initSvg}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        className="svg"
        width="100%"
        height="800"
      >
        <g
          {...jsxArrayMap(links, (link: any) => <GraphLink {...link} /> as any)}
        />
        <g
          {...jsxArrayMap(nodes, (node: any) => <GraphNode {...node} /> as any)}
        />
      </svg>
    </div>
  );
};
