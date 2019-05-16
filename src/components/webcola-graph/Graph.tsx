import { LayoutAdaptor } from "./layout-adaptor";
import { injectToProperty, value, compute, FidanArray } from "@fidanjs/runtime";
import { jsxArrayMap } from "@fidanjs/jsx";
import "./graph.scss";
import { nodeToGraph } from "./util";
import { grammarTr } from "../../grammar/tr";

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
  const propX = value(props.x);
  const propY = value(props.y);

  injectToProperty(props, "x", propX);
  injectToProperty(props, "y", propY);

  return (
    <g>
      <rect
        className="node"
        width={props.width}
        height={props.height}
        fill={props.nodeFill || "blue"}
        rx="3"
        ry="3"
        x={compute(() => propX() - props.width / 2)}
        y={compute(() => propY() - props.height / 2)}
      >
        <title>{props.name}</title>
      </rect>
      <text
        className="label"
        x={propX()}
        y={compute(() => propY() + 5)}
        fill={props.labelFill || "blue"}
      >
        {props.name}
      </text>
    </g>
  );
};

const GraphLink = (props: { source: IGraphNode; target: IGraphNode }) => {
  if (props.source.x === undefined) return null;
  const propX1 = value(props.source.x);
  const propY1 = value(props.source.y);
  const propX2 = value(props.target.x);
  const propY2 = value(props.target.y);
  injectToProperty(props.source, "x", propX1);
  injectToProperty(props.source, "y", propY1);
  injectToProperty(props.target, "x", propX2);
  injectToProperty(props.target, "y", propY2);
  return (
    <line
      className="link"
      x1={propX1()}
      y1={propY1()}
      x2={propX2()}
      y2={propY2()}
    />
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////
var cola = new LayoutAdaptor(960, 500);

// var graphData = require("./sample-data/fivenodesdisconnected.json");

const graphData = nodeToGraph(grammarTr());
// cola
//   .nodes(graphData.nodes)
//   .links(graphData.links)
//   .start();
cola
  .avoidOverlaps(true)
  .size([1200, 800])
  .nodes(graphData.nodes)
  .links(graphData.links)
  // .jaccardLinkLengths(100)
  .avoidOverlaps(true)
  .flowLayout("x", 130)
  .flowLayout("y", 60)
  .symmetricDiffLinkLengths(36)
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
        <defs>
          <marker
            id="end-arrow"
            viewBox="0 -5 10 10"
            refX="25"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,-5L10,0L0,5L2,0" stroke-width="0px" fill="#000" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};
