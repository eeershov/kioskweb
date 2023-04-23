import { createContext } from "react";

let mobOrDesk: "Mobile" | "Desktop";
console.log(window.innerWidth);
if (window.innerWidth > 620) {
  mobOrDesk = "Desktop";
} else {
  mobOrDesk = "Mobile";
}
export const ViewportContext = createContext(mobOrDesk);
