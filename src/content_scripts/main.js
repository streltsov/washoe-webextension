import React from "react";
import ReactDOM from "react-dom";
import { Washoe } from "./Washoe";

const washoeRoot = document.createElement("div");
document.body.appendChild(washoeRoot);
ReactDOM.render(<Washoe />, washoeRoot);
