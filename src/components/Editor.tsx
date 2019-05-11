import { value, FidanArray, compute } from "@fidanjs/runtime";
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

const addChild = (node: INode) => {
  const text = prompt("Text");
  if (text) {
    node.childs().push({
      text: value(text),
      childsType: value(
        node.childs().length
          ? node.childs()[node.childs().length - 1].childsType()
          : node.childsType()
      ),
      childs: value([]) as any
    });
  }
  allNodes(nodeList(ROOT_NODE()));
};

const allNodes = value(nodeList(ROOT_NODE())) as FidanArray<INode[]>;
let lastSelected: INode = null;

export const Editor = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Tip</th>
            <th>Alt Elemenlar</th>
          </tr>
        </thead>
        <tbody
          {...jsxArrayMap(
            allNodes,
            node => {
              if (!node.childs) return <></>; // TODO return null

              return (
                <tr
                  className={compute(() =>
                    node.childs().find(c => c.isSelected()) !== undefined
                      ? "any-child-selected-node"
                      : ""
                  )}
                >
                  <td>
                    {
                      <input
                        type="text"
                        className={compute(() =>
                          node.isSelected() ? "selected-input" : ""
                        )}
                        value={node.text()}
                        size={compute(() => node.text().length + 5)}
                        onFocus={() => node.isSelected(true)}
                        onBlur={() => node.isSelected(false)}
                        onInput={e => node.text(e.target["value"])}
                      />
                    }
                  </td>
                  <td>
                    <select
                      onChange={e => {
                        node.childsType(e.target["value"] as any);
                      }}
                    >
                      <option
                        value="ordered"
                        selected={node.childsType() === "ordered"}
                      >
                        Sıralı -
                      </option>
                      <option
                        value="choice"
                        selected={node.childsType() === "choice"}
                      >
                        Seçim |
                      </option>
                    </select>
                  </td>
                  <td>
                    <span
                      {...jsxArrayMap(
                        node.childs,
                        child => {
                          return (
                            <span>
                              <span
                                onClick={() => {
                                  if (lastSelected)
                                    lastSelected.isSelected(false);
                                  child.isSelected(true);
                                  lastSelected = child;
                                }}
                                className={compute(() =>
                                  child.isSelected() ? "selected-node" : ""
                                )}
                              >
                                {child.text()}
                              </span>
                              <span style={{ fontSize: "40px" }}>
                                {compute(() => {
                                  return node.childsType() === "choice"
                                    ? " | "
                                    : " _ ";
                                })}
                              </span>
                              {/* TODO <span>
                                {compute(() => {
                                  return node.childsType() === "choice" ? (
                                    <span> | </span>
                                  ) : (
                                    <span> -> </span>
                                  );
                                })}
                              </span>
                              <span>
                                {node.childsType() === "choice" ? " | " : " - "}
                              </span> */}
                            </span>
                          ) as any;
                        },
                        "reconcile"
                      )}
                    />
                    <button
                      className={"btn-small"}
                      onClick={() => addChild(node)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ) as any;
            },
            "reconcile"
          )}
        />
      </table>
      <Graph />
    </div>
  );
};
