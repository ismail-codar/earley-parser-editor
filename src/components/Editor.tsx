import "./editor.scss";
import { value, FidanArray, compute } from "@fidanjs/runtime";
import { Graph } from "./webcola-graph/Graph";
import { IGrammarNode } from "../types";
import { jsxArrayMap } from "@fidanjs/jsx";
import PouchDB from "pouchdb";
import { parse, stringify } from "flatted";
import { nodeList } from "../utils/earley";

let _inited = false;
PouchDB.plugin(require("pouchdb-upsert"));
var grammarDb = new PouchDB("grammar_tr", {
  revs_limit: 1,
  auto_compaction: true
});

const allNodes = value([]) as FidanArray<IGrammarNode[]>;
let lastSelected: IGrammarNode = null;

grammarDb.get("tr").then(doc => {
  const fidanKeys = ["text", "childsType", "childs", "isSelected"];
  const json = parse(doc["data"], (key: string, val: any) => {
    if (fidanKeys.includes(key) && val !== null && val !== undefined) {
      return value(val);
    }
    return val;
  });
  allNodes(nodeList(json));
});

const addChild = (node: IGrammarNode) => {
  const text = prompt("Text");
  if (text) {
    node.childs().push({
      text: value(text),
      childsType: value(
        node.childs().length
          ? node.childs()[node.childs().length - 1].childsType()
          : node.childsType()
      ),
      isSelected: value(false),
      childs: value([]) as any
    });
  }
  allNodes(nodeList(allNodes()[0]));
};

const saveGrammar = () => {
  if (!_inited) return;
  const arr = stringify(allNodes()[0]);
  grammarDb
    .upsert("tr", () => {
      return { data: arr };
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
};
compute(() => saveGrammar(), [allNodes]);
setTimeout(() => {
  _inited = true;
}, 1000);

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
                        onBlur={() => {
                          node.isSelected(false);
                          saveGrammar();
                        }}
                        onInput={e => node.text(e.target["value"])}
                      />
                    }
                  </td>
                  <td>
                    <select
                      onChange={e => {
                        node.childsType(e.target["value"] as any);
                        saveGrammar();
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
