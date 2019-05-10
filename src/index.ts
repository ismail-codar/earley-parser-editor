import { Main } from "./views/Main";
import { TEST1 } from "./_tmp/test1";

const mainView = Main();
const appMainDom = document.getElementById("app_main");
if (appMainDom.firstElementChild) appMainDom.firstElementChild.remove();
appMainDom.appendChild(mainView as any);

TEST1();
