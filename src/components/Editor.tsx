import { Node } from "./Node";
import { value } from "@fidanjs/runtime";
import { ROOT_NODE } from "../store";
import { Graph } from "./webcola-graph/Graph";

export const Editor = () => {
  console.log(JSON.parse(JSON.stringify(ROOT_NODE(), null, 1)));
  return (
    <div>
      <Node text="Root" childsType={value("choice")} />
      <Node text="xx" childsType={value("ordered")} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Bob Dylan</td>
            <td>Musician</td>
            <td>California, USA</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Eric Clapton</td>
            <td>Musician</td>
            <td>Ohio, USA</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Daniel Kahneman</td>
            <td>Psychologist</td>
            <td>California, USA</td>
          </tr>
        </tbody>
      </table>
      <Graph />
    </div>
  );
};
