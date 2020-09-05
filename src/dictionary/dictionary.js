import React from "react";
import ReactDOM from "react-dom";
import { Pane } from "evergreen-ui";

function Dictionary () {
  console.log("helluva");
  return (
    <Pane>
      Hello!
    </Pane>
  );
};

ReactDOM.render(<Dictionary />, document.getElementById("root"));
