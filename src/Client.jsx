import { createRoot } from "react-dom/client";
import "doodle.css/doodle.css";

// it's going to receive markup form the server and then it's gonna turn that markup in react component
import { createFromFetch } from "react-server-dom-webpack/client";

console.log("fetching flight response");
const fetchPromise = fetch("/react-flight");
const root = createRoot(document.getElementById("root"));
const p = createFromFetch(fetchPromise);
console.log("rendering root", p);

// this goes and gets the markup from the server and render's gonna await on that promise to be done and then it'll be rendered
root.render(p);
