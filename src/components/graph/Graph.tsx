import * as webcola from "webcola";
import { LayoutAdaptor } from "./layout-adaptor";
import { injectToProperty, value, compute, FidanArray } from "@fidanjs/runtime";
import { jsxArrayMap } from "@fidanjs/jsx";
import "./graph.scss";

interface IGraphNode {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

const GraphNode = (props: IGraphNode) => {
  if (!props.x) return null;
  const propX = value(props.x);
  const propY = value(props.y);

  injectToProperty(props, "x", propX);
  injectToProperty(props, "y", propY);

  compute(() => {
    console.log(propX(), propY());
  });

  return (
    <g>
      <rect
        className="node"
        width="60"
        height="40"
        rx="5"
        ry="5"
        x={compute(() => propX() - props.width / 2)}
        y={compute(() => propY() - props.height / 2)}
      >
        <title>{props.name}</title>
      </rect>
      <text className="label" x={propX()} y={compute(() => propY() + 10)}>
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

var graphData = require("./sample-data/fivenodesdisconnected.json");
cola
  .nodes(graphData.nodes)
  .links(graphData.links)
  .start();
console.log(graphData);
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
        width="960"
        height="500"
      >
        <g
          {...jsxArrayMap(links, (link: any) => <GraphLink {...link} /> as any)}
        />
        <g
          {...jsxArrayMap(nodes, (node: any) => <GraphNode {...node} /> as any)}
        />
        {/* {graphData() === null ? null : (
          <>
            {graphData().links.map(link => (
              <GraphLink {...link} />
            ))}
            {graphData().nodes.map(node => (
              <GraphNode {...node} />
            ))}
          </>
        )} */}
      </svg>
    </div>
  );
};
