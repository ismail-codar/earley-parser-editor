import { Editor } from "../components/Editor";
import "./main.scss";
import { value, FidanArray } from "@fidanjs/runtime";

const arr = value([1, 2, 4, 5, 6]) as FidanArray<number[]>;

setTimeout(() => {
  arr().push(7);
  setTimeout(() => {
    arr().push(8);
  }, 2000);
}, 2000);

export const Main = () => {
  return (
    <div className="main">
      <nav className="border fixed split-nav">
        <div className="nav-brand">
          <h3>
            <a href="#">Earley Parser Editör</a>
          </h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <button>
            <label htmlFor="collapsible1">
              <div className="bar1" />
              <div className="bar2" />
              <div className="bar3" />
            </label>
          </button>
          <div className="collapsible-body">
            <ul className="inline">
              <li>
                <a href="#">Dökümantasyon</a>
              </li>
              <li>
                <a
                  href="https://github.com/ismail-codar/earley-parser-editor"
                  target="_blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="paper">
        <Editor />
      </div>
    </div>
  );
};
