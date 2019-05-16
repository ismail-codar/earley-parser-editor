global["document"] = {
  createElement: () => null
};
import { earleyString } from "../utils/earley";
import { ROOT_NODE } from "../store";

const str = earleyString(ROOT_NODE());
console.log(str);
