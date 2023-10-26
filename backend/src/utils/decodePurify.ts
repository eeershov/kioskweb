import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

/** removing \&quot; */
export const decodeHtml = (str: string) => {
  const txt = window.document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

export const decodePurify = (str: string) => {
  return purify.sanitize(decodeHtml(str));
};
