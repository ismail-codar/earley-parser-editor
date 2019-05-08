import { Node } from "./Node";
import { value } from "@fidanjs/runtime";

export const Editor = () => {
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
    </div>
  );
};
